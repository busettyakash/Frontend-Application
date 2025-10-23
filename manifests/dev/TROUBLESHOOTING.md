# Troubleshooting Degraded Resources

## Common Issues and Fixes

### 1. Certificate Degraded
**Cause**: cert-manager not installed or ClusterIssuer not ready

**Fix**:
\`\`\`bash
# Install cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
\`\`\`

### 2. Deployment Degraded
**Cause**: Image pull error - wrong image registry

**Fix**:
- Replace `<YOUR_ACR_LOGIN_SERVER>` in deployment.yaml with your actual ACR URL
- Example: `myregistry.azurecr.io/frontend-dev:latest`

### 3. Ingress/TLS Degraded
**Cause**: NGINX Ingress Controller not installed

**Fix**:
\`\`\`bash
# Install NGINX Ingress Controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
\`\`\`

### 4. HPA Degraded
**Cause**: Metrics Server not installed

**Fix**:
\`\`\`bash
# Install Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
\`\`\`

## Verification Commands

\`\`\`bash
# Check cert-manager status
kubectl get pods -n cert-manager

# Check NGINX Ingress Controller
kubectl get pods -n ingress-nginx

# Check certificate status
kubectl describe certificate frontend-dev-cert -n gvk-platform-dev

# Check deployment status
kubectl describe deployment frontend-dev -n gvk-platform-dev

# Check HPA status
kubectl describe hpa frontend-dev-hpa -n gvk-platform-dev

# View events for debugging
kubectl get events -n gvk-platform-dev --sort-by='.lastTimestamp'
\`\`\`

## Quick Fix Script

\`\`\`bash
#!/bin/bash

# Add Helm repos
helm repo add jetstack https://charts.jetstack.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install cert-manager
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true

# Install NGINX Ingress Controller
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace

# Install Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Wait for resources to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=cert-manager -n cert-manager --timeout=300s
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx --timeout=300s

echo "All prerequisites installed successfully!"
