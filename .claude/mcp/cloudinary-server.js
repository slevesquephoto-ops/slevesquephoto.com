#!/usr/bin/env node
/**
 * Serveur MCP custom Cloudinary — lecture seule
 * Opérations : list_folder, get_asset, get_url
 *
 * Installation : npm install @modelcontextprotocol/sdk cloudinary
 * Lancement : node .claude/mcp/cloudinary-server.js
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration depuis les variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const server = new Server(
  { name: "cloudinary-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ─── Outils disponibles ────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_folder",
      description: "Liste tous les assets d'un dossier Cloudinary avec leurs métadonnées",
      inputSchema: {
        type: "object",
        properties: {
          folder: {
            type: "string",
            description: "Chemin du dossier (ex: slevesque/faune)",
          },
          max_results: {
            type: "number",
            description: "Nombre max de résultats (défaut: 100)",
            default: 100,
          },
        },
        required: ["folder"],
      },
    },
    {
      name: "get_asset",
      description: "Récupère les métadonnées détaillées d'un asset spécifique",
      inputSchema: {
        type: "object",
        properties: {
          public_id: {
            type: "string",
            description: "L'identifiant public Cloudinary (ex: slevesque/faune/renard-001)",
          },
        },
        required: ["public_id"],
      },
    },
    {
      name: "get_url",
      description: "Génère une URL Cloudinary optimisée avec transformations",
      inputSchema: {
        type: "object",
        properties: {
          public_id: {
            type: "string",
            description: "L'identifiant public Cloudinary",
          },
          width: {
            type: "number",
            description: "Largeur en pixels (optionnel)",
          },
          height: {
            type: "number",
            description: "Hauteur en pixels (optionnel)",
          },
          quality: {
            type: "string",
            enum: ["auto", "auto:good", "auto:best", "auto:eco"],
            description: "Qualité (défaut: auto:good)",
            default: "auto:good",
          },
          format: {
            type: "string",
            enum: ["auto", "webp", "avif", "jpg"],
            description: "Format de sortie (défaut: auto)",
            default: "auto",
          },
          blur_placeholder: {
            type: "boolean",
            description: "Générer une version blur 20px pour placeholder next/image",
            default: false,
          },
        },
        required: ["public_id"],
      },
    },
    {
      name: "list_all_series",
      description: "Liste tous les dossiers de premier niveau sous slevesque/ (= toutes les séries)",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
}));

// ─── Handlers ──────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_folder": {
        const result = await cloudinary.api.resources({
          type: "upload",
          prefix: args.folder,
          max_results: args.max_results ?? 100,
          context: true,
        });

        const photos = result.resources.map((r) => ({
          publicId: r.public_id,
          width: r.width,
          height: r.height,
          format: r.format,
          bytes: r.bytes,
          createdAt: r.created_at,
          url: cloudinary.url(r.public_id, { fetch_format: "auto", quality: "auto:good" }),
          alt: r.context?.custom?.alt ?? "",
        }));

        return {
          content: [{ type: "text", text: JSON.stringify({ folder: args.folder, count: photos.length, photos }, null, 2) }],
        };
      }

      case "get_asset": {
        const result = await cloudinary.api.resource(args.public_id, { context: true });
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_url": {
        const transforms = {
          fetch_format: args.format ?? "auto",
          quality: args.quality ?? "auto:good",
          ...(args.width && { width: args.width }),
          ...(args.height && { height: args.height }),
          crop: "fill",
        };

        const url = cloudinary.url(args.public_id, transforms);
        let blurUrl = null;

        if (args.blur_placeholder) {
          blurUrl = cloudinary.url(args.public_id, {
            width: 20,
            effect: "blur:200",
            fetch_format: "auto",
            quality: "auto:eco",
          });
        }

        return {
          content: [{ type: "text", text: JSON.stringify({ url, blurUrl, transforms }) }],
        };
      }

      case "list_all_series": {
        const result = await cloudinary.api.sub_folders("slevesque");
        return {
          content: [{ type: "text", text: JSON.stringify(result.folders, null, 2) }],
        };
      }

      default:
        throw new Error(`Outil inconnu: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Erreur Cloudinary: ${error.message}` }],
      isError: true,
    };
  }
});

// ─── Démarrage ─────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Serveur MCP Cloudinary démarré");
