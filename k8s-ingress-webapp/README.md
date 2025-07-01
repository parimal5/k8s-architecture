# 🚀 Setting Up Ingress Controller on Kind Cluster

## 🎯 Objective

To enable Ingress routing in a local **Kind (Kubernetes in Docker)** cluster by installing the **NGINX Ingress Controller** and exposing it via standard HTTP (port 80) and HTTPS (port 443).

This setup helps you:

- Access apps via user-friendly URLs like `http://localhost/`
- Simulate production-like Ingress behavior in a local environment

---

## ⚠️ Why This is Needed for Kind

Kind runs Kubernetes nodes inside Docker containers, and by default:

- It does **not include an Ingress controller**
- It does **not expose ports 80/443** to the host machine

To use Ingress locally:

1. We expose ports 80 and 443 in the cluster config
2. We install the NGINX Ingress controller manually

---

## 🧱 Step 1: Create a Kind Cluster

This project already includes a Kind cluster config file with the necessary port mappings.

👉 Run the following command to create the cluster:

```bash
kind create cluster --config kind-config.yaml
```

This exposes ports 80 and 443 from the control-plane node to your localhost.

## 🌐 Step 2: Install NGINX Ingress Controller

Apply the official Ingress-NGINX manifest for Kind:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/kind/deploy.yaml

```

Verify the controller is running:

```bash
kubectl get pods -n ingress-nginx
```

## ⚠️Troubleshooting

Wait until all pods show status Running or Completed.

### 🛠 Fixing Ingress Controller Pending Issue in Kind

When using the NGINX Ingress controller on a Kind cluster, the controller pod may get stuck in a Pending state with this error:

0/3 nodes are available: 3 node(s) didn't match Pod's node affinity/selector.

### 📌 Root Cause

The official Ingress deployment expects a node labeled with `ingress-ready=true`, but Kind nodes do not have this label by default. Since only the control-plane node has ports 80/443 mapped (via extraPortMappings), the controller must run there.

### ✅ Fix

Run the following to label the control-plane node:

```bash
kubectl label node kind-control-plane ingress-ready=true
```

Then verify that the controller pod is scheduled successfully:

```bash
kubectl get pods -n ingress-nginx -w
```

Once it's in Running state, Ingress routing will work as expected.
