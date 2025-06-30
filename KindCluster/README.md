# Kind Cluster Setup

## 📦 Cluster Configuration

[Kind Configuration](./kind-config.yaml)

**This creates a Kind cluster with:**

- 1 control-plane node
- 2 worker nodes

## 🚀 Create the Cluster

Make sure Docker Desktop is running.

```bash
kind create cluster --config=kind-config.yaml
```

## ❌ Delete the Cluster

To delete the cluster:

```bash
kind delete cluster --name kind
```

## ✅ Verify the Cluster

After creation, confirm it’s working:

```bash
kubectl cluster-info --context kind-kind
kubectl get nodes
```

## 📝 Notes

This setup uses the default cluster name: kind

- Ensure you have Docker Desktop and kubectl installed on Windows
- You can customize kind-config.yaml for port mappings, extra mounts, or enabling Ingress
