/* mbskeys.js - ECMAscript to process key sequences in our Help book generator, Marcel Bresink, 2013-05-28 */

function keySpansInDocument()
{
	var elements, i, j, count1, count2, currentClass;
	var result = [];
	
	elements = wrapper.getElementsByTagName("span");
	count1 = elements.length;
	for (i = 0; i < count1; i++) {
		currentClass = elements[i].getAttribute("class");
        if (currentClass != null) {
            currentClass = currentClass.split(" ");
			count2 = currentClass.length;
            for (j = 0; j < count2; j++) {
                if (currentClass[j] === "keys") {
                    result.push(elements[i]);
                    break;
                }
            }
        }		
	}
	return result;
}


function trimmedString(string)
{
	var c, result, i, count;
	
	result = "";
	count = string.length;
	for (i = 0; i < count; i++) {
		c = string.charAt(i);
		if ((c != '\n') && (c != '\r') && (c != '\t') && (c != ' '))
			result = result.concat(c); 
	}
	return result;
}


function processedKeyElementsForSpan(span)
{
	var keySequence, keys, i, count, currentKey, newKbdNode, newTextNode;
	var result = [];
	
	keySequence = span.firstChild.nodeValue;
	if (keySequence != null) {
		keys = keySequence.split("+");
		count = keys.length;
		for (i = 0; i < count; i++) {
			currentKey = trimmedString(keys[i]);
			if ((currentKey != null) && (currentKey.length > 0)) {
				newKbdNode = document.createElement("kbd");
				newTextNode = document.createTextNode(currentKey);
				newKbdNode.appendChild(newTextNode);
				result.push(newKbdNode);
				
				if (i < count - 1) {
					newNode = document.createTextNode("+");
					result.push(newNode);
				}
			}
		}
	}
	return result;
}


function expandKeySequences()
{
	var keySpans, i, j, count1, count2, currentKeySequenceNodes;
	var currentSpanParent, newSpan;
	
	keySpans = keySpansInDocument();
	count1 = keySpans.length;
	for (i = 0; i < count1; i++) {
		currentKeySequenceNodes = processedKeyElementsForSpan(keySpans[i]);
		count2 = currentKeySequenceNodes.length;
		if (count2 > 0) {
			currentSpanParent = keySpans[i].parentNode;
			newSpan = document.createElement("span");
			currentSpanParent.replaceChild(newSpan, keySpans[i]);
			for (j = 0; j < count2; j++)
				newSpan.appendChild(currentKeySequenceNodes[j]);
		}
	}
}
