(*
Contains ideads for getting info needed to match a SKU number from product list
*)


global deviceProductClass -- Laptop, Tablet or Desktop -- SPHardwareDataType or -- configCode (MacBook Pro / iMac)

global deviceModelNumber -- MD101LL/A, MC509LL/A, etc.-- compare specs and model id in product list

global deviceModelIdentifier -- iPhone9,3, iMac17,1, MacBookPro9,1, etc. -- SPHardwareDataType

global deviceYear -- Mid 2007, Late 2013, 2016, etc. -- configCode (on error ask, some models only show MacBook Air)

global deviceSerialNumber -- C02MK2VZFD59 -- SPHardwareDataType

global deviceProcessorType -- C2D, QCi7 DCi3, etc. -- combine SPDisplaysDataType

global deviceProcessorDescription -- Dual-Core i3, Quad-Core i7, etc. -- combine SPDisplaysDataType

global deviceProcessorCores -- 2, 4, etc. -- SPHardwareDataType

global deviceProcessorSpeed -- 3.06, 2.5, etc. -- SPHardwareDataType remove GHz

global deviceScreenSize -- 20, 21.5, 15.4, 9.7, etc.-- configCode

global deviceScreenResolution -- 1366 X 768, 1920 X 1200, 1680 X 1050, etc. -- SPDisplaysDataType

global deviceRAM -- 4GB, 12GB, etc. -- SPHardwareDataType or SPMemoryDataType for speed and how many sticks installed

global deviceStorageSize -- 500GB, 256GB, 32GB -- SPStorageDataType and SPHardwareDataType

global deviceStorageType -- HDD, SSD, Flash -- SPStorageDataType and SPHardwareDataType

global deviceGPU -- Radeon HD 4670, HD Graphics 4000, GeForce GTX 775M -- SPDisplaysDataType

global deviceFusionStatus -- SPHardwareRAIDDataType? -- SPStorageDataType and SPHardwareDataType may also help

-- not sure
global deviceHousingColor -- White, Black, Aluminum, Space Gray, etc.
global deviceCarrier -- T-Mobile, Verizon, AT&T, or Sprint
