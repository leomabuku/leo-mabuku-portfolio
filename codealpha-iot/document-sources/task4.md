# IoT Security Challenges: A Water-Monitoring Case Study

## Introduction and Scope

A water-monitoring system is valuable only when its users can trust the measurements and understand when information is unavailable. Internet of Things (IoT) security therefore concerns the whole system: a sensor, its microcontroller, the network, the backend, applications, and the people administering them. A stolen device key or a misleading reading can affect operational decisions even if the dashboard appears to work normally. OWASP Foundation (2018) identifies weak credentials, insecure interfaces, unsafe data transfer, and missing update mechanisms among common IoT risks.

This case study analyzes the documented design of MajiSmart Zambia, a water-monitoring project in Leo Mabuku's GitHub portfolio. Its repository describes ESP32 telemetry, an application programming interface (API), and web and Android clients (Mabuku, n.d.-b). The integrated telemetry notes describe local implementation changes while explicitly recording outstanding hardware, firmware, and PostgreSQL testing (Mabuku, n.d.-a). This is a documentation-based design analysis, not a penetration test, a production security audit, or a report of an actual incident. Recommendations and proposed tests below are not claims that those controls were verified in deployment.

## System Context and Trust Boundaries

The documented architecture uses an ultrasonic sensor and an ESP32 to measure distance to a tank's water surface. The device submits a reading to an API; the backend checks the device and installation, calculates water-level information, and makes data available to applications. Administrators use a web interface, while customers have an Android-facing interface. Reports and alerts form part of the wider ecosystem (Mabuku, n.d.-a, n.d.-b).

Important assets include the accuracy and freshness of tank readings, device credentials, administrative accounts, customer reports, location data, and availability of the service. Trust boundaries occur between the sensor and device, the device and API, the API and data store, and the backend and each client. The system considered here monitors conditions; it is not assumed to operate a pump. If future versions control equipment, physical safety requires additional analysis.

NIST's device cybersecurity baseline identifies capabilities such as device identification, configuration, data protection, restricted access to interfaces, software updates, and cybersecurity state awareness (Fagan et al., 2020). These capabilities help structure the assessment, but a baseline is not proof of security: requirements must be selected and verified for the intended operating environment (Fagan et al., 2021).

## Threat Analysis

**Device impersonation and false telemetry.** A person who obtains a device credential may be able to submit readings as that device. False but plausible values could trigger unnecessary investigation or conceal a low tank. A secret accidentally committed to source control or exposed in logs and screenshots increases this risk. Physical access could also permit tampering or extraction of secrets, depending on hardware protections. The impact is primarily integrity of operational information, rather than proof that the water supply itself has been altered.

**Interception and replay.** Unprotected network traffic can expose credentials and permit modification in transit. Transport Layer Security (TLS) can protect traffic when the client validates the server certificate, but encryption does not establish that a compromised sensor is truthful. The telemetry notes describe an optional measured timestamp checked against server time; because it is optional and not a signed measurement, that check alone is not a complete replay defense (Mabuku, n.d.-a).

**Account and interface misuse.** An API, dashboard, or mobile application can expose information or administrative actions if authorization is missing or applied only in the interface. Customer reports may contain personally identifying details even when the numerical sensor data seem harmless. OWASP Foundation (2018) includes insecure ecosystem interfaces and insufficient privacy protection in its IoT risk categories. Access decisions must therefore be enforced at the backend, not merely by hiding a button.

**Loss of availability and stale information.** Sensor faults, power loss, poor connectivity, overloaded services, or malicious traffic can stop fresh readings. A system that presents the last known value as current creates an operational hazard. An apparently valid value can also be physically wrong because of mounting, calibration, or sensor failure. Security controls should support measurement quality and clear status, not replace engineering validation.

**Maintenance and physical exposure.** Devices and dependencies may acquire vulnerabilities over time. Unverified firmware updates can introduce malicious code, while debug ports and inadequately protected enclosures can reveal credentials. These threats depend on the actual installation and attacker access; the case study does not assert that any of them has occurred.

## Documented Controls and Remaining Gaps

The integrated telemetry document describes per-device credentials, rejection of unknown or revoked devices, key rotation, and checks on the device-to-tank relationship. It describes measurement range checks and a calibration workflow, as well as offline and sensor-fault states (Mabuku, n.d.-a). These features are relevant to identification, access control, and operational awareness. The same document states that additional rate limiting is future work and that hardware and PostgreSQL tests have not been completed. Documentation of a control is not evidence that every deployment has configured it correctly.

The firmware notes also describe an HTTPS requirement and a trusted certificate authority, without an insecure TLS bypass (Mabuku, n.d.-a). This is an appropriate intended transport design, but its implementation, certificate lifecycle, time handling, and failure behavior still require testing. A timestamp can help reject some stale messages; it does not prevent all replay or fabrication by a credential holder. Likewise, a simulator marker is documented as an accidental-contamination guard, not cryptographic proof of data origin. Distinguishing intentional design from verified behavior prevents an overstated security claim.

## Recommended Controls

**Provision and protect identity.** Create a unique, high-entropy credential for every device; do not reuse a shared production key or commit secrets. Restrict who can provision, rotate, and revoke credentials. Maintain an inventory mapping each device to its installation and owner. Limit repeated authentication attempts and log failures without logging the key. These recommendations align with NIST's device-identification and interface-access capabilities (Fagan et al., 2020).

**Protect communications and data.** Require HTTPS with certificate validation and an operational plan for certificate renewal. Check the device-to-tank binding and reject invalid measurements. If replay resistance is a requirement, design a sequence-number or nonce scheme and test it against device restarts, offline buffering, and clock drift. Restrict access to the database and backups, and collect only information needed for the service. TLS and range checks reduce risk but cannot guarantee the truth of a compromised sensor.

**Enforce least privilege.** Apply authorization on the server to every sensitive operation, including administrative configuration and access to customer reports. Use strong authentication for accounts, support multifactor authentication for administrators where feasible, and review whether personal report details appear in public views or logs. Define retention and deletion procedures. NIST emphasizes choosing device requirements in the context of the surrounding system and its risk management (Fagan et al., 2021).

**Plan for failure and maintenance.** Show timestamps and explicit offline or sensor-error states; do not convert missing data into a normal reading. Provide a manual operational procedure, test backups and restoration, and assign responsibility for monitoring and incident response. Before deployment, establish authenticated firmware update and rollback procedures, maintain dependencies, and restrict unused interfaces. The update mechanism must be evaluated for the actual hardware rather than assumed to exist.

## Verification Plan

The following are proposed acceptance checks for an authorized test environment, not completed results. Record the version, configuration, test inputs, expected and observed outcomes, and redacted evidence. First, submit a valid simulated reading, then retry with an invalid or revoked test key; unauthorized requests should not change stored readings. Second, check mismatched device and tank identifiers, out-of-range distances, and invalid timestamps against the documented API contract. Third, attempt an administrative action and another customer's data access from a customer account; both should be denied.

Fourth, verify that a client rejects an untrusted certificate in a controlled environment and that no production credential is sent over plain HTTP. Fifth, interrupt telemetry and confirm that the display identifies stale or offline data; then restore connectivity and verify recovery. Finally, rotate a test key and confirm that the old key fails, inspect logs for leaked secrets, and restore a backup to a disposable environment. Physical calibration, firmware compilation, PostgreSQL persistence, and end-to-end deployment require separate tests before operational claims are made (Mabuku, n.d.-a).

## Conclusion

MajiSmart illustrates why IoT security extends beyond a connected sensor. Device identity, secure transport, server-side authorization, privacy, fresh status information, and maintainable operations all contribute to trustworthy monitoring. The documented local design offers useful starting controls, but its stated testing gaps remain material. A defensible deployment would verify those controls, document limitations, and prepare a response to failures rather than declaring the system secure on the strength of its architecture alone.

## References

Fagan, M., Marron, J., Brady, K. G., Jr., Cuthill, B. B., Megas, K. N., Herold, R., Lemire, D., & Hoehn, B. (2021). *IoT device cybersecurity guidance for the federal government: Establishing IoT device cybersecurity requirements* (NIST Special Publication 800-213). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-213

Fagan, M., Megas, K. N., Scarfone, K., & Smith, M. (2020). *IoT device cybersecurity capability core baseline* (NISTIR 8259A). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.IR.8259A

Mabuku, L. (n.d.-a). *Integrated telemetry and installation (local implementation)* [Project documentation]. GitHub. https://github.com/leomabuku/majismart-zambia/blob/3143c77e90e90b73e0bebf271bc7f918d86730ac/docs/INTEGRATED_TELEMETRY.md

Mabuku, L. (n.d.-b). *MajiSmart Zambia* [Source code repository]. GitHub. https://github.com/leomabuku/majismart-zambia/tree/3143c77e90e90b73e0bebf271bc7f918d86730ac

OWASP Foundation. (2018). *OWASP Internet of Things project: IoT Top 10 2018*. https://owasp.org/index.php/OWASP_Internet_of_Things_Project
