//----------------------------------------------------------------------------
//
//  $Id: PreviewAndPrintLabel.js 11419 2010-04-07 21:18:22Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: Preview and Print label
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------


(function () {
    // stores loaded label info
    var label;

    // called when the document completly loaded
    function onload() {
        var labelFile = document.getElementById('labelFile');
        //var addressTextArea = document.getElementById('addressTextArea');
        var printersSelect = document.getElementById('printersSelect');
        var printButton = document.getElementById('printButton');
        var messageText = document.getElementById('messageText')


        // initialize controls
        printButton.disabled = true;
        //addressTextArea.disabled = true;

        // Generates label preview and updates corresponend <img> element
        // Note: this does not work in IE 6 & 7 because they don't support data urls
        // if you want previews in IE 6 & 7 you have to do it on the server side
        function updatePreview() {
            if (!label)
                return;

            var pngData = label.render();

            var labelImage = document.getElementById('labelImage');
            labelImage.src = "data:image/png;base64," + pngData;
        }

        // loads all supported printers into a combo box 
        function loadPrinters() {
            var printers = dymo.label.framework.getPrinters();
            if (printers.length == 0) {
                alert("No DYMO printers are installed. Install DYMO printers.");
                return;
            }

            for (var i = 0; i < printers.length; i++) {
                var printer = printers[i];
                if (printer.printerType == "LabelWriterPrinter") {
                    var printerName = printer.name;

                    var option = document.createElement('option');
                    option.value = printerName;
                    option.appendChild(document.createTextNode(printerName));
                    printersSelect.appendChild(option);
                }
            }
        }

        /* returns current address on the label 
        function getAddress() {
            if (!label || label.getAddressObjectCount() == 0)
                return "";

            return label.getAddressText(0);
        }

        // set current address on the label 
        function setAddress(address) {
            if (!label || label.getAddressObjectCount() == 0)
                return;

            return label.setAddressText(0, address);
        }


        //updates address on the label when user types in textarea field
        addressTextArea.onkeyup = function () {
            if (!label) {
                alert('Load label before entering address data');
                return;
            }

            setAddress(addressTextArea.value);
            updatePreview();
        }*/

        // prints the label
        printButton.onclick = function () {
            messageText.textContent = "Printing...";
            try {
                if (!label) {
                    alert("Load label before printing");
                    return;
                }

                //alert(printersSelect.value);
                label.print(printersSelect.value);
                messageText.textContent = "Print Successful";
                //label.print("unknown printer");
            }
            catch (e) {
                messageText.textContent = error;
                alert(e.message || e);
            }
        }
        function getAddressLabelXml() {

            var labelXml = dymo.label.framework.openLabelXml(generatedLabel);
            return labelXml;
        }
        function loadLabelFromWeb() {
            // use jQuery API to load label
            //$.get("Address.label", function(labelXml)
            //{
            label = dymo.label.framework.openLabelXml(getAddressLabelXml());
            // check that label has an address object
            /*if (label.getAddressObjectCount() == 0) {
                alert("Selected label does not have an address object on it. Select another label");
                return;
            }*/

            updatePreview();
            //addressTextArea.value = getAddress();
            printButton.disabled = false;
            //addressTextArea.disabled = false;
            //}, "text");
        }

        loadLabelFromWeb();

        // load printers list on startup
        loadPrinters();

        // prints label once done loading label and printer list
        printLabel();
    };

    function printLabel() {

        try {
            
            label.print(printersSelect.value);
            messageText.textContent = "Print Successful";

        } catch (error) {

            messageText.textContent = error;
            
        }
    }

    function initTests()
	{
		if(dymo.label.framework.init)
		{
			//dymo.label.framework.trace = true;
			dymo.label.framework.init(onload);
		} else {
			onload();
		}
	}

	// register onload event
	if (window.addEventListener)
		window.addEventListener("load", initTests, false);
	else if (window.attachEvent)
		window.attachEvent("onload", initTests);
	else
		window.onload = initTests;

}());