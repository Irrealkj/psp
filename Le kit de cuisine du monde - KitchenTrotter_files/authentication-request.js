function createInstructionIframe(instruction) {
    // Get instruction container element
    container = document.getElementById('instructionContainer');

    // Clean instruction container
    container.innerHTML = '';

    // Create iframe element
    var iframe = document.createElement('iframe');
    iframe.id = 'instructionIframe';
    iframe.name = 'instructionIframe';
    iframe.src = 'about:blank';
    iframe.width = instruction.value.target.width;
    iframe.height = instruction.value.target.height;
    iframe.style.visibility = instruction.value.target.visible ? 'visible' : 'hidden';

    // Handle timeout
    if (instruction.value.timeout) {
        setTimeout(() => {
            const instructionResultTimeout = {
                eventName: 'LYRA_AUTH_INSTRUCTION_RESULT',
                value: {
                    name: instruction.value.name,
                    value: 'TIMEOUT',
                    protocol: {
                        name: instruction.protocol.name,
                        version: instruction.protocol.version,
                        network: instruction.protocol.network,
                        challengePreference: instruction.protocol.challengePreference,
                        simulation: instruction.protocol.simulation
                    },
                },
            };
            window.postMessage(JSON.stringify(instructionResultTimeout), '*');
        }, instruction.value.timeout * 1000);
    }

    // Add iframe to container
    container.appendChild(iframe);

    // Create form to post
    var form = document.createElement('form');
    form.id = 'instructionForm';
    form.name = 'instructionForm';
    form.target = 'instructionIframe';
    form.method = instruction.value.http.method;
    form.action = instruction.value.http.url;
    form.style = 'visibility: hidden';

    // Create form body
    Object.keys(instruction.value.http.body).forEach(function (name) {
        form.innerHTML += '<input name="' + name + '" value="' + instruction.value.http.body[name] + '">';
    });

    // Add form to container
    container.appendChild(form);

    // Triger form submit
    form.submit();
}

window.addEventListener('message', function (messageEvent) {
    
    console.info(messageEvent.origin);

    var data = messageEvent.data;
    try {
        var messageData = JSON.parse(data);
        if (messageData.eventName === 'LYRA_AUTH_INSTRUCTION_RESULT') {
            try {
                // callback call with messageData.value content
                container = document.getElementById('instructionContainer');
                
                var form = document.createElement('form');
                
                form.method = 'POST';
                form.action = formData.action;
                form.style = 'visibility: hidden';					
                    
                form.innerHTML += "<input name='messageData' value='" + data + "'>";
                form.innerHTML += '<input name="operationSessionId" value="' + createTokenResponse.operationSessionId + '">';
                form.innerHTML += '<input name="' + formData.t_name + '" value="' + formData.t_value + '">';
                
                container.appendChild(form);
                form.submit();
            } catch (err) {
                console.error('addEventListener message error', err)
            } finally {
                // always close the iFrame/popin
                container = document.getElementById('instructionContainer');
                container.remove();
            }
        }
    } catch (err) {
        // process eventual exceptions during callbacks
        console.error('Callback exception', err);
    }
    
}, false);

window.onload = function() {
   createInstructionIframe(createTokenResponse); 
};
