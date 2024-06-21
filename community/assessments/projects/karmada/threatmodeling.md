# Threat Modeling with STRIDE

## Spoofing

### Threat-01-S - Spoofing of Karmada Admin

The identity of the Karmada Admin with access to Karmada API-Sever can be spoofed
by other users due to stolen credentials or lack of authentication.

### Threat-01-S Recommended mitigations

* Karmada API-Sever must authenticate Karmada Admin before processing request.
* If the authentication check fails then the request must be discarded and logged as a security event.

### Threat-02-S - Spoofing of a Karmada API-Sever

 When a worker cluster is created, a user could somehow interfere with it and send 
 instructions to it as Karmada API-Sever, this can happen through Karmada Agent or 
 kube-apiserver (depending push or pull mode). If the user could gain access to the 
 Karmada worker cluster, it can allow the user to gain access to secrets they should 
 not be able to.

### Threat-02-S Recommended Mitigations

* Karmada worker cluster must authenticate Karmada API-Sever before processing request.
* Karmada Agent must authenticate Karmada API-Sever before processing request.
* If the authentication check fails then the request must be discarded and logged as a security event.

## Tampering

### Threat-03-T - Tampering of Karmada

 Karmada components (API Server, Agent, Controller Manager and Scheduler) and configuration 
 files (ETCD) can be tampered during build time, installation or runtime.

### Threat-03-T Recommended Mitigations

* At build time: Create SBoM of all the Karmada components and verify checksum as a post build action.
* During installation: Verify checksum and signature of the downloaded components.
* During runtime: Alert and log on modification of Karmada components to detect for potential tampering.

### Threat-04-T - Tampering of Communication to Karmada Worker Cluster

 The communication from Karmada Control Plane to Karmada Worker Cluster can be tampered 
 during transit. This can allow malicious actors to modify the commands sent by the Karmada 
 Control Plane to Karmada Agent or kube-apiserver (depending push or pull mode).

### Threat-04-T Recommended Mitigations

* Karmada worker cluster must check the integrity of the commands received from Karmada Control Plane before processing.
* Karmada Agent must check the integrity of the commands received from Karmada Control Plane before processing.
* If the integrity check fails then the commands must be discarded and logged as a security event.


## Repudiation

### Threat-05-R - Repudiation of actions performed by Karmada Admin

Karmada Admin has highly privileged access to cloud and cluster resources. Misuse
of permissions via actions performed by Karmada Admin should be detectable and
logged for auditing purposes.

### Threat-05-R Recommended Mitigations

* Implement auditing for Karmada control plane to log all actions performed by Karmada Admin.
* Implement centralized audit collection and alerting for any suspicious activity or security events.

## Information Disclosure

### Threat-06-I - Exposure of communication between Karmada Control Plane and Karmada Worker Cluster

A malicious actor can snoop the communication between Karmada Control Plane and Karmada Worker cluster.
This allows the malicious actor to get access to any sensitive or secret information passed between them.

### Threat-06-I Recommended mitigations

* Sensitive information send between Karmada control plane and Karmada worker cluster (Karmada Agent and kube-apiserver) must be encrypted.

## Denial of Service

### Threat-07-D - Exhausting Cloud resources

A user within the network of Karmada environment can send incessant requests to Karmada worker cluster making it unavailable to Karmada Contorl Plane.


### Threat-07-D Recommended Mitigations

* Isolate the network of Karmada environment.
* Isolate the Karmada worker cluster from users.
## Elevation of Privilege

### Threat-08-E - Using Karmada worker cluster to get access to Karmada Control Plane

If a Karmada worker cluster is colocated in the same system as a Karmada control plane.
A user can use the credentials of Karmada worker cluster to snapshot the disk 
of the Karmada control plane, create a new EC2 volume, mount it to a node in the workload 
cluster, and exfiltrate the etcd datastore. The same thing can happen if a Karmada worker cluster
is compromised or controlled by a malicious actor.

### Threat-08-E Recommended mitigations

* Karmada control plane and Karmada worker cluster (Karmada Agent and kube-apiserver) must have different roles and access levels to implement separation of privileges.


### Threat-09-E - Using create cluster permission to get cluster admin access

Someone with create cluster permissions can elevate their access by locating the
credentials that can give cluster-admin access to the attacker.

##### Threat-09-E Recommended Mitigation

* Limit who can create pods.
* Implement Cluster level Pod Security to prevent host access for someone with
  Create Pod access.
