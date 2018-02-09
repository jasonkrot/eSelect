var ESelect = (function(){
    var lastIndex = 0;
    
    var _helpers = {
        indexOfIn: function(array, searchedValue){
            for(var i = 0; i < array.length; ++i){
                if(searchedValue in array[i]){
                    return array[i];
                }
            }
            return -1;
        },
        addOptionsToDropdown: function(element, dropdownContainerElement){
            for(var i = 0; i < dropdownContainerElement.children.length; ++i){
                dropdownContainerElement.children[i].removeEventListener('click', element.eSelect.option.select);
            }
            dropdownContainerElement.innerHTML = '';
        
            var options = _helpers.getOptions(element.options);
            var selectedValues = _helpers.getOptions(element.selectedOptions);
            var option;
            for(var i = 0; i < options.length; ++i){
                for(var value in options[i]){
                    option = element.eSelect.settings.createOption(value, options[i][value], _helpers.indexOfIn(selectedValues, value) !== -1);
                    option.addEventListener('click', element.eSelect.option.select);
                    dropdownContainerElement.appendChild(option);
                }
            }
        },
        getOptions: function(elementOptionArray){
            var options = [];
            var value;
            for(var i = 0; i < elementOptionArray.length; ++i){
                value = {};
                value[elementOptionArray[i].value] = elementOptionArray[i].text;
                options.push(value);
            }
            return options;
        },
        getNewElementIdNumber: function(){
            return ++lastIndex;
        },
        getButtonLabelText: function(element, buttonTextSeparator){
            var valueString = '';
            var selectedOptions = _helpers.getOptions(element.selectedOptions);
            for(var i = 0; i < selectedOptions.length; ++i){
                if(valueString){
                    valueString += buttonTextSeparator;
                }
                for(var value in selectedOptions[i]){
                    valueString += selectedOptions[i][value];
                }
            }
            return valueString;
        },
        createHTMLElement: function(type, attributes, textContent, eventListeners){
            var element = document.createElement(type);
            if(typeof attributes !== 'undefined'){
                for(var name in attributes){
                    element.setAttribute(name, attributes[name]);
                }
            }
            if(textContent){
                element.textContent = textContent;
            }
            if(eventListeners){
                for(var eventType in eventListeners){
                    element.addEventListener(eventType, eventListeners[eventType]);
                }
            }
            return element;
        }
    };
    
    var possibleSettings = {
        general: {
            closeOnSelect: true,
            buttonTextSeparator: ", "
        },
        createWrapper: function(element){
            var wrapperElement = document.createElement('div');
            wrapperElement.classList.add('e-select-wrapper');
            document.addEventListener('click', element.eSelect.wrapper.closeOnOffClick);
            return wrapperElement;
        },
        createButton: function(element){
            var buttonElement = _helpers.createHTMLElement('div', {class: 'e-select-button e-select-button-closed', id: 'e-select-button-' + element.eSelect.eSelectId}, null, {click: element.eSelect.dropdown.toggle});
    
            buttonElement.appendChild(_helpers.createHTMLElement('div', {class: 'e-select-button-label'}, _helpers.getButtonLabelText(element, element.eSelect.settings.general.buttonTextSeparator)));
            buttonElement.appendChild(element.eSelect.settings.createButtonArrow(element));
            return buttonElement;
        },
        createButtonArrow: function(element){
            var arrowWrapper = _helpers.createHTMLElement('span', {class: 'e-select-button-arrow'});
            arrowWrapper.appendChild(_helpers.createHTMLElement('span', {class: 'e-select-button-arrow-mark'}));
            return arrowWrapper
        },
        updateButton: function(element){
            element.eSelect.pluginElements.button.getElementsByClassName('e-select-button-label')[0].textContent = _helpers.getButtonLabelText(element, element.eSelect.settings.general.buttonTextSeparator);
        },
        createDropdown: function(element){
            var dropdownContainerElement = _helpers.createHTMLElement('div', {class: 'e-select-dropdown-container'});
            _helpers.addOptionsToDropdown(element, dropdownContainerElement);
            
            var dropdownElement = _helpers.createHTMLElement('div', {class: 'e-select-dropdown e-select-dropdown-closed', id: 'e-select-dropdown-' + element.eSelect.eSelectId});
            dropdownElement.appendChild(dropdownContainerElement);
            
            return dropdownElement;
        },
        createOption: function(value, textContent, isSelected){
            var option = _helpers.createHTMLElement('div', {class: 'e-select-option' + (isSelected ? ' selected' : '')}, textContent);
            option.dataset.value = value;
            return option;
        },
        updateOptions: function(element){
            _helpers.addOptionsToDropdown(element, element.eSelect.pluginElements.dropdown.children[0]);
        }
    };
    
    var EventListenerHandler = function(eventListenerList){
        var _callbacks = {};
        var _lastCallbackIds = {};
        var _this = this;
        
        function subscribe(eventType, callback){
            var eventTypeName = callback ? _getEventTypeName(eventType) : eventType;
            if(!_callbacks[eventTypeName]){
                _lastCallbackIds[eventTypeName] = 0;
                _callbacks[eventTypeName] = {};
                _this[eventTypeName] = function(datas){
                    for(var callbackId in _callbacks[eventTypeName]){
                        _callbacks[eventTypeName][callbackId](datas);
                    }
                };
            }
            if(typeof callback !== 'undefined'){
                var id = ++_lastCallbackIds;
                _callbacks[eventTypeName][id] = callback;
                return id;
            }
            return null;
        }
        
        function unsubscribe(eventType, callbackId){
            delete _callbacks[_getEventTypeName(eventType)][callbackId];
        }
    
        var _init = function(){
            for(var i = 0; i < eventListenerList.length; ++i){
                subscribe(_getEventTypeName(eventListenerList[i]));
            }
        };
    
        var _getEventTypeName = function(eventType){
            return '$_' + eventType;
        };
    
        _init();
    };
    
    var ESelectBase = function(element, newSettings){
        this.build = function(){
            element.parentNode
                .insertBefore(
                    element.eSelect.pluginElements.wrapper = newSettings.createWrapper(element),
                    element);
        
            element.eSelect
                .pluginElements
                .wrapper.appendChild(element.eSelect.pluginElements.button = newSettings.createButton(element));
        
            element.eSelect
                .pluginElements
                .wrapper.appendChild(element.eSelect.pluginElements.dropdown = newSettings.createDropdown(element));
        };
        this.change = function(value){
            for(var i = 0; i < element.children.length; ++i){
                if(element.children[i].value === value){
                    element.children[i].selected = 'selected';
                }
            }
            element.eSelect.events.$_onChange(value);
            if(newSettings.general.closeOnSelect){
                element.eSelect.dropdown.close();
            }
            element.eSelect.reRender();
        };
        this.events = new EventListenerHandler(['onInit', 'onChange', 'onDestroy']);
        this.destroy = function(){
            var originalSelectDisplay = element.eSelect.original.style.display;
            document.removeEventListener('click', element.eSelect.wrapper.closeOnOffClick);
            element.eSelect.pluginElements.button.removeEventListener('click', element.eSelect.dropdown.toggle);
            element.parentNode.removeChild(element.eSelect.pluginElements.wrapper);
            delete element.eSelect;
            element.style.display = originalSelectDisplay;
        };
        this.dropdown = {
            open: function(event){
                element.eSelect.pluginElements.dropdown.style.height = element.eSelect.pluginElements.dropdown.children[0].clientHeight + 'px';
                element.eSelect.pluginElements.dropdown.classList.remove('e-select-dropdown-closed');
                element.eSelect.pluginElements.button.classList.remove('e-select-button-closed');
            },
            close: function(event){
                element.eSelect.pluginElements.dropdown.style.height = '0px';
                element.eSelect.pluginElements.dropdown.classList.add('e-select-dropdown-closed');
                element.eSelect.pluginElements.button.classList.add('e-select-button-closed');
            },
            toggle: function(event, forceOpen){
                if(element.eSelect.pluginElements.dropdown.classList.contains('e-select-dropdown-closed')){
                    if(forceOpen !== false){
                        element.eSelect.dropdown.open();
                    }
                }else{
                    if(forceOpen !== true){
                        element.eSelect.dropdown.close();
                    }
                }
            }
        };
        this.wrapper = {
            closeOnOffClick: function(event){
                if(!element.eSelect.pluginElements.wrapper.contains(event.target)){
                    element.eSelect.dropdown.toggle(event, false);
                }
            }
        };
        this.option = {
            select: function(event){
                element.eSelect.change(event.target.dataset.value);
            }
        };
        this.original = {
            style: {}
        };
        this.element = element;
        this.eSelectId = _helpers.getNewElementIdNumber();
        this.pluginElements = {};
        this.reRender = function(){
            newSettings.updateButton(element);
            newSettings.updateOptions(element);
        };
        this.settings = newSettings;
    };
    
    var _initialize = function(selectorElement, settings){
        var element = typeof selectorElement === 'string' ? document.querySelector(selectorElement) : selectorElement;
        var newSettings = {};
        for(var setting in possibleSettings){
            newSettings[setting] = settings && settings[setting] ? settings[setting] : possibleSettings[setting];
        }
        if(element){
            element.eSelect = new ESelectBase(element, newSettings);
            
            element.eSelect.original.style.display = element.style.display;
            element.style.display = 'none';
            
            element.eSelect.build();
            return element;
        }else{
            throw new Error('Cannot select the given elements: ' + selector);
        }
    };
    
    var _destroy = function(selectorElement){
        var element = typeof selectorElement === 'string' ? document.querySelector(selectorElement) : selectorElement;
        if(element){
            if('eSelect' in element){
                element.eSelect.destroy();
            }
        }else{
            throw new Error('Cannot select the given elements: ' + selector);
        }
    };
    
    return {
        initialize: _initialize,
        destroy: _destroy
    };
})();

var exampleNormalElement;
document.addEventListener("DOMContentLoaded", function() {
    exampleNormalElement = ESelect.initialize('#example-normal');
});