## Kubernetes Projects with Node.js App (Mini to Advanced)

This repository contains a collection of Kubernetes projects, ranging from beginner-friendly setups to advanced production-like deployments. Each project uses a custom Node.js application and is tested locally using [Kind (Kubernetes IN Docker)](https://kind.sigs.k8s.io/).

---

## 🚀 Getting Started

### Prerequisites

- Docker
- [Kind](https://kind.sigs.k8s.io/)
- kubectl
- Node.js (for modifying or testing the app)

### Steps

**Clone this repo**

```bash
git clone https://github.com/parimal5/k8s-architecture.git
cd k8s-architecture
```

**Build Docker image**

```bash
docker build -t parimal5/node-app-sample:latest .
```

**Create Kind cluster**<br>
See detailed steps in [Kind Cluster Setup](./KindCluster/)

## 🧪 Testing & Validation

You can test each project locally using curl, kubectl port-forward, or by accessing the Ingress endpoint, depending on the setup.

```bash
kubectl port-forward svc/node-app-service 3000:3000
```

Visit:
`http://localhost:3000/`

🔧Project Structure:
WIP

## 📚 Learning Goals

- Practice Kubernetes YAML writing
- Learn how to deploy real apps on Kind
- Understand K8s resource types incrementally
- Get comfortable debugging Kubernetes issues locally

## 🔮 Future Additions (Planned)

- CI/CD with GitHub Actions
- Helm-based deployments
- Network Policies and RBAC examples
- Monitoring & Logging

## 🧑‍💻 Author

Made with ❤️ by Parimal Meshram
