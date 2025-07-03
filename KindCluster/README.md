# KIND Cluster Setup

Quick setup for a multi-node Kubernetes cluster using KIND (Kubernetes in Docker).

## Prerequisites

- **Docker Desktop** running
- **kubectl** installed
- **KIND** installed - [Installation Guide](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)

## Cluster Configuration

**File:** `kind-config.yaml`

Creates a cluster with:
- 1 control-plane node
- 2 worker nodes

## Setup Commands

### Create Cluster
```bash
kind create cluster --config=kind-config.yaml
```

### Verify Cluster
```bash
kubectl cluster-info --context kind-kind
kubectl get nodes
```

### Delete Cluster
```bash
kind delete cluster --name kind
```


## Notes
- Uses default cluster name: `kind`
- Requires Docker Desktop to be running
- Customize `kind-config.yaml` for port mappings or ingress setup
- For ingress configuration with port mappings, see [kind-config-ingress.yaml](./kind-config-ingress.yaml) example
