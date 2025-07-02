# 🗂️ Kubernetes Storage Practice (Kind Cluster)

This repository contains practice examples for working with Kubernetes volumes using a local Kind cluster. It covers both **static** and **dynamic provisioning**, using best practices and realistic use cases.

---

## 📦 What You'll Learn

- Difference between **static** and **dynamic** volume provisioning
- How to create and use:
  - `PersistentVolume` (PV)
  - `PersistentVolumeClaim` (PVC)
  - `StorageClass`
- Understand **access modes** (`RWO`, `RWX`, `ROX`)
- How to use storage with **Deployments** and **StatefulSets**

---
## 🔹 Static Provisioning

With static provisioning:

- You manually create a PersistentVolume and PersistentVolumeClaim.
- The path on the node (e.g., /data/static-test) must already exist.
- Access is usually ReadWriteOnce, so only one pod can use it at a time.

_📌 Limitation: You can’t scale a Deployment using a static RWO volume. Only one replica can use the volume._

## 🔹 Dynamic Provisioning

With dynamic provisioning:

- A StorageClass + PVC automatically creates a PV when needed.
- Easier to manage for StatefulSets or on cloud.

## ✅ Production Tips

- Use StatefulSet when each pod needs its own persistent volume
- Use RWX storage when multiple pods need shared access
- Avoid scaling Deployments with a single RWO PVC

## 🔄 Can Deployments Use Volumes?

✅ Yes — but there are important rules:

| Scenario                             | Works? | Notes                                                            |
| ------------------------------------ | ------ | ---------------------------------------------------------------- |
| Deployment + RWO PVC (1 replica)     | ✅     | Works fine — volume mounted to one pod only                      |
| Deployment + RWO PVC (multi-replica) | ❌     | Pods will conflict — only one can attach the volume              |
| Deployment + RWX PVC                 | ✅     | All replicas can read/write shared volume (e.g., NFS, EFS, etc.) |
| StatefulSet + volumeClaimTemplates   | ✅     | Each pod gets its own RWO PVC                                    |
