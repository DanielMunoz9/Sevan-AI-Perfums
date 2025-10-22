#!/bin/bash
# Script temporal para forzar redeploy en Vercel
echo "Deploying to Vercel..."
echo "$(date)" > deploy-trigger.txt
git add deploy-trigger.txt
git commit -m "Force Vercel redeploy - $(date)"
# Necesitas hacer push al repositorio configurado