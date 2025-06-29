# 🐳 Kubernetes Node.js App (Deployed on Kind)

This project demonstrates deploying a basic custom **Node.js web application** to a **Kubernetes cluster** using **Kind**. It includes Kubernetes resources like Deployment, Service, ConfigMap, and Secret.

---

## Demo App Used

[sample-applications](sample-applications/)

## 🚀 How to Run

### 1. Create Kind Cluster

```bash
kind create cluster
```

### 2. Apply Kubernetes Manifests

```bash
kubectl create ns webapp         # Optional
kubectl apply -f k8s/ -n webapp                # Or omit -n if not using namespace
```

## 3. Verify Resources

```bash
kubectl get all -n webapp
```

## 4. Port Forward to Access App

```bash
kubectl port-forward svc/webapp-service 3000:80 -n webapp
```

## 🔐 Secrets & Config

- ConfigMap holds environment variables like APP_ENV.
- Secret stores sensitive info like DB_PASSWORD (base64 encoded).
- Both are mounted into the deployment as environment variables.

## 📌 Notes

- Deployment includes resource requests/limits and health probes.
- This is a stateless app with 2 replicas for high availability.
- The Kind cluster is local only; this setup is ideal for practice and testing.

## 🧹 Clean Up

```bash
kubectl delete -f k8s/ -n webapp
kind delete cluster
```
