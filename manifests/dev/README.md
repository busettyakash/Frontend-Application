# Jain University Login - Development Environment Deployment

This directory contains all Kubernetes manifests for deploying the Jain University login application in a **development environment**.

## Prerequisites

- Kubernetes cluster (v1.24+)
- kubectl configured to access your cluster
- NGINX Ingress Controller installed
- cert-manager installed (for SSL/TLS)
- Docker image built and available: `jain-login:dev`

## Files Overview

| File | Purpose |
|------|---------|
| `namespace.yaml` | Creates isolated `jain-university-dev` namespace |
| `configmap.yaml` | Development environment variables |
| `deployment.yaml` | 2 replicas with dev resource limits |
| `service.yaml` | ClusterIP service for internal routing |
| `ingress.yaml` | Routes traffic from `jain-dev.duckdns.org` |
| `hpa.yaml` | Auto-scaling (2-5 replicas) |
| `serviceaccount.yaml` | RBAC service account |
| `certificate.yaml` | SSL/TLS certificate management |
| `clusterissuer.yaml` | Let's Encrypt staging issuer |
| `networkpolicy.yaml` | Network security policies |

## Deployment Steps

### 1. Create Namespace
\`\`\`bash
kubectl apply -f manifests/dev/namespace.yaml
\`\`\`

### 2. Install NGINX Ingress Controller (if not already installed)
\`\`\`bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
\`\`\`

### 3. Install cert-manager (if not already installed)
\`\`\`bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
\`\`\`

### 4. Deploy All Manifests
\`\`\`bash
kubectl apply -f manifests/dev/
\`\`\`

### 5. Verify Deployment
\`\`\`bash
# Check namespace
kubectl get namespace jain-university-dev

# Check pods
kubectl get pods -n jain-university-dev

# Check services
kubectl get svc -n jain-university-dev

# Check ingress
kubectl get ingress -n jain-university-dev

# Check certificate status
kubectl describe certificate jain-login-dev-cert -n jain-university-dev
\`\`\`

## Accessing the Application

Once deployed, access your application at:
\`\`\`
https://jain-dev.duckdns.org
\`\`\`

## Monitoring

### View Logs
\`\`\`bash
kubectl logs -f deployment/jain-login-dev -n jain-university-dev
\`\`\`

### Check Pod Status
\`\`\`bash
kubectl describe pod <pod-name> -n jain-university-dev
\`\`\`

### Monitor HPA
\`\`\`bash
kubectl get hpa -n jain-university-dev -w
\`\`\`

## Development Configuration

- **Replicas**: 2 (minimum for HA)
- **CPU Request**: 250m | Limit: 500m
- **Memory Request**: 256Mi | Limit: 512Mi
- **Auto-scaling**: 2-5 replicas based on CPU/Memory
- **SSL/TLS**: Let's Encrypt Staging (for testing)

## Updating the Deployment

### Update Image
\`\`\`bash
kubectl set image deployment/jain-login-dev \
  jain-login=jain-login:dev-v2 \
  -n jain-university-dev
\`\`\`

### Update ConfigMap
\`\`\`bash
kubectl apply -f manifests/dev/configmap.yaml
kubectl rollout restart deployment/jain-login-dev -n jain-university-dev
\`\`\`

## Troubleshooting

### Certificate Not Issuing
\`\`\`bash
kubectl describe clusterissuer letsencrypt-staging
kubectl describe certificate jain-login-dev-cert -n jain-university-dev
\`\`\`

### Pods Not Starting
\`\`\`bash
kubectl describe pod <pod-name> -n jain-university-dev
kubectl logs <pod-name> -n jain-university-dev
\`\`\`

### Ingress Not Working
\`\`\`bash
kubectl describe ingress jain-login-dev -n jain-university-dev
kubectl get events -n jain-university-dev
\`\`\`

## Cleanup

To remove all development resources:
\`\`\`bash
kubectl delete namespace jain-university-dev
\`\`\`

## Notes

- Uses **staging** Let's Encrypt for development (to avoid rate limits)
- Network policies restrict traffic to NGINX ingress only
- Pod anti-affinity ensures pods run on different nodes when possible
- Security context runs containers as non-root user (UID 1000)
