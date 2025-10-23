# Jain University Login - Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (v1.24+)
- kubectl configured to access your cluster
- NGINX Ingress Controller installed
- cert-manager installed (for SSL/TLS)
- Docker image built and pushed to registry

## Cluster Setup Instructions

### 1. Install NGINX Ingress Controller

\`\`\`bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=LoadBalancer
\`\`\`

### 2. Install cert-manager (for SSL/TLS)

\`\`\`bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
\`\`\`

### 3. Create ClusterIssuer for Let's Encrypt

\`\`\`bash
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@jain-university.edu
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
\`\`\`

## Deployment Steps

### 1. Create Namespace and ConfigMap

\`\`\`bash
kubectl apply -f manifests/namespace.yaml
kubectl apply -f manifests/configmap.yaml
\`\`\`

### 2. Create Service Account

\`\`\`bash
kubectl apply -f manifests/serviceaccount.yaml
\`\`\`

### 3. Deploy Application

\`\`\`bash
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
kubectl apply -f manifests/ingress.yaml
kubectl apply -f manifests/hpa.yaml
\`\`\`

### 4. Verify Deployment

\`\`\`bash
# Check pods
kubectl get pods -n jain-university

# Check services
kubectl get svc -n jain-university

# Check ingress
kubectl get ingress -n jain-university

# Check certificate status
kubectl get certificate -n jain-university
\`\`\`

## Accessing Your Application

Once deployed, access your application at:
\`\`\`
https://jain-dev.duckdns.org
\`\`\`

## Monitoring

### View Logs

\`\`\`bash
kubectl logs -n jain-university -l app=jain-login -f
\`\`\`

### Check Pod Status

\`\`\`bash
kubectl describe pod -n jain-university <pod-name>
\`\`\`

### Monitor HPA

\`\`\`bash
kubectl get hpa -n jain-university -w
\`\`\`

## Troubleshooting

### Certificate Not Issuing

\`\`\`bash
kubectl describe certificate -n jain-university jain-login-tls
kubectl describe clusterissuer letsencrypt-prod
\`\`\`

### Ingress Not Working

\`\`\`bash
kubectl describe ingress -n jain-university jain-login
\`\`\`

### Pod Crashes

\`\`\`bash
kubectl logs -n jain-university <pod-name> --previous
\`\`\`

## Cleanup

\`\`\`bash
kubectl delete namespace jain-university
\`\`\`

## Domain Configuration

Your domain `jain-dev.duckdns.org` should point to your cluster's Ingress Controller IP/LoadBalancer address.

Update your DuckDNS settings to point to your cluster's external IP:

\`\`\`bash
# Get your Ingress Controller's external IP
kubectl get svc -n ingress-nginx
