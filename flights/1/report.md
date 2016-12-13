# Flight on 13th December 2016

| thing | thang |
|-------|-------|
| Rocket: | 26mm, balsa fins |
| Motor: | A6-4 |
| PCB tag: | Batch#1 |
| Code tag: | flight-1 |

Issues
* Apoapsis ~2 sec before burn-out. Motor was too weak to hold speed.
* Nosecone came loose when parachute opened, fell straight down while body glided away
* No flight data logged on line. Server could not be reached.
* No flight data logged on flash. Rebooted just before launch because of the missing connection, and initialization did not finish until flight was over.

Things to fix
* Change to a more reliable server
* Check that data is being logged on line before launching
* Make initialization routine asynchronous, so data logging begins immediately after reboot
* Tie better knots

Logs
* No interesting logs
