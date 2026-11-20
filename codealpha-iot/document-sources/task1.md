# IoT in Smart Agriculture: Smarter Irrigation and Water Management

## Introduction

Agriculture depends on timely decisions about water, yet a fixed irrigation schedule cannot respond to every change in rainfall, soil condition, and crop growth. Internet of Things (IoT) systems link sensors and computing devices to networks so that measurements can inform decisions beyond the field. In smart agriculture, these measurements can help farmers and water managers monitor soil moisture, track water supplies, and adjust irrigation. This report examines how connected irrigation works, what real deployments suggest, and what must be addressed before adopting it in a Zambian context.

## How Connected Irrigation Works

A typical system begins with sensors that measure soil water, air conditions, or water levels. A microcontroller reads the sensors and sends data through a network, such as Wi-Fi or a cellular connection, to an application. The application displays measurements and may generate alerts. A farmer can then decide whether to irrigate; alternatively, a controller may operate a valve using agreed rules. Dong et al. (2024) describe an in-field IoT system that combined sensor stations, a website, and a smartphone application for irrigation management.

The value of each reading depends on what it measures. A soil-moisture sensor estimates conditions around a particular location and depth; a tank-level sensor indicates available water but does not reveal a crop's water demand. Placement, soil characteristics, and calibration therefore matter. In a systematic review, Datta and Taghvaeian (2023) found that sensor accuracy was particularly sensitive to calibration. A useful system must also display when measurements were taken: a plausible but old reading can be misleading after a network outage.

## Evidence From Practice

The Food and Agriculture Organization of the United Nations (FAO, n.d.) describes six connected sensors installed in irrigation systems in Kyrgyzstan's Kochkor district. The devices measure water levels at gauging stations, calculate flow and volume from preset parameters, store readings, and transmit data over cellular networks. Water-management staff and a water users' association use the information to account for and distribute irrigation water. FAO reports improved monitoring and fewer misunderstandings among community members. This is an institutional water-accounting example, not a farm-level soil-moisture trial; its reported benefits cannot automatically be transferred to other sites.

Field research provides a different example. In a Michigan tomato-field demonstration, a sensor-based irrigation strategy applied 30% less water than the farmer's comparison schedule while producing similar marketable yield and quality (Dong et al., 2024). That result belongs to the conditions and comparison used in that study. It is evidence of potential, not a promise that every farm will save 30%. The broader review by Datta and Taghvaeian (2023) also reported varying outcomes across studies and comparison methods.

## Benefits, Risks, and Adoption

Connected measurements can help users identify dry conditions, review trends, and investigate a low water supply sooner. Carefully calibrated automation may reduce repetitive work and avoid unnecessary irrigation. However, cost, sensor maintenance, power supply, network coverage, and access to technical support determine whether a system is practical. Kim et al. (2020) emphasize that African agricultural technologies must account for different connectivity conditions, including situations where information is stored offline until a connection becomes available.

Poor placement, corrosion, incorrect calibration, and interrupted communication can all reduce confidence in readings. A responsible design should identify stale or implausible values, retain a manual override, and allow farmers to compare sensor information with direct observations. Decisions should use crop and soil expertise rather than a universal threshold. Data security is also necessary: NIST's IoT baseline identifies capabilities including device identification, data protection, controlled interfaces, and secure updates (Fagan et al., 2020). Credentials should be unique, and access to farm data should be limited to authorized people.

## A Possible Zambian Pilot

The choice of communication technology should follow the site rather than the other way around. A farm with reliable Wi-Fi might send frequent readings, while a remote site may need a cellular connection and local storage during outages. Battery or solar power may be useful where mains electricity is unreliable, but both bring maintenance and replacement costs. A pilot should include farmers in deciding how often alerts are useful, who can see the data, and who will repair failed equipment. These are design considerations for a proposed pilot, not findings from a Zambian field trial.

A small pilot could monitor a vegetable plot and its water tank. Soil-moisture probes at representative depths would inform irrigation decisions, while a separate tank sensor would indicate supply. A mobile-friendly dashboard could show readings, timestamps, and a low-tank alert. Initially, the farmer would retain control of irrigation while the team checks sensors against field observations and records costs. Comparing measured water use, crop outcomes, and maintenance effort with an agreed baseline would be necessary before claiming benefits.

This proposal draws inspiration from MajiSmart Zambia, whose public repository describes ESP32 water telemetry, an API, and web and Android interfaces (Mabuku, n.d.). MajiSmart is a water-monitoring project; the proposed agricultural pilot is an adaptation, not a claim that farm deployment has already occurred. Local crop advice, soil calibration, connectivity, affordability, and user consent would still need to be established.

## Conclusion

IoT can make irrigation decisions more responsive by connecting measurements with people who manage water. The strongest evidence supports carefully evaluated, context-specific use rather than guaranteed savings. A credible pilot combines calibrated sensors, secure data handling, farmer knowledge, reliable maintenance, and clear measurement of outcomes.

## References

Datta, S., & Taghvaeian, S. (2023). Soil water sensors for irrigation scheduling in the United States: A systematic review of literature. *Agricultural Water Management, 278*, Article 108148. https://doi.org/10.1016/j.agwat.2023.108148

Dong, Y., Werling, B., Cao, Z., & Li, G. (2024). Implementation of an in-field IoT system for precision irrigation management. *Frontiers in Water, 6*, Article 1353597. https://doi.org/10.3389/frwa.2024.1353597

Fagan, M., Megas, K. N., Scarfone, K., & Smith, M. (2020). *IoT device cybersecurity capability core baseline* (NISTIR 8259A). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.IR.8259A

Food and Agriculture Organization of the United Nations. (n.d.). *IoT sensors for irrigation water accounting*. FAO Agritech Observatory. https://agritechobservatory.review.fao.org/en/iot-sensors-for-irrigation-water-accounting

Kim, J., Shah, P., Gaskell, J. C., Prasann, A., & Luthra, A. (2020). *Scaling up disruptive agricultural technologies in Africa*. World Bank. https://doi.org/10.1596/978-1-4648-1522-5

Mabuku, L. (n.d.). *MajiSmart Zambia* [Source code repository]. GitHub. https://github.com/leomabuku/majismart-zambia/tree/3143c77e90e90b73e0bebf271bc7f918d86730ac
