# file checker test
import r2pipe
import time

r = r2pipe.open("frida://spawn/usb//n0ps.svcCaller")

r.cmd(".:e/")
print("[x] Calculating SVC addresses")

# locate supervisor call 
svcInst = r.cmd("/ai svc | grep svc").split()
address = svcInst[0]

# modify mov x0, 1 to mov x0, 0
output = r.cmd("pd -50 @ " + address + " | grep 'mov x0, 1'").split()
print(output)
r.cmd("wa mov x0, 0 @ " + output[1])
r.cmd("wa mov x0, 0 @ " + output[7])

# continue application
r.cmd(":dc")

time.sleep(10000)
