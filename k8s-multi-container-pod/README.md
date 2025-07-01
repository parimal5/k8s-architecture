## 📦 Multi-Container Pod with Shared Volume (Sidecar Pattern)

This project demonstrates a Kubernetes Pod with:

- A main container writing data to a shared volume
- A sidecar container reading from the same volume
- A shared emptyDir volume to exchange data

This is a common pattern used in real-world workloads like logging agents, file watchers, or data preprocessors.

## 🛠️ Folder Structure

```bash
.
├── multi-container-pod.yaml   # Pod manifest with shared volume
└── README.md                  # You're here!
```

## 🚀 How It Works

- Main Container (`app-container`): Writes "Hello from main container" into `/shared-data/hello.txt`.

- Sidecar Container (`sidecar-container`): Continuously tails the contents of `/shared-data/hello.txt`.
  `Both containers mount the same`emptyDir`volume at`/shared-data`, allowing data sharing during pod lifecycle.

## 📦 Deployment Steps

- Apply the Pod manifest:

```bash
kubectl apply -f multi-container-pod.yaml
```

- Verify the Pod is running:

```bash
kubectl get pods
```

- Check logs of the sidecar container:

```bash
kubectl logs shared-volume-pod -c sidecar-container
```

- You should see output similar to:

```bash
Sidecar watching file:
Hello from main container
```

## ✅ Use Cases

- Log shipping sidecars (e.g., Fluent Bit)
- Local file caching
- Inter-process communication within a pod
