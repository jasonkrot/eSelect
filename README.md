# eSelect
A select, that revolutionizes the select plugins, and lets the developers customize it as much as possible.

# State
Sill unusable, we just started to work on it.

# Goals
- make it as overwriteable and customizable/extendable as possible
- make it so overwriteable, that almost everything should have an API or a settable option in it.
- avoid using any thirdparty codes
- make it usable on touchscreen devices also
- make it work IE11+, Edge, newer Chrome, Firefox and FF Quantum, Safari, Opera
- less memory and cpu usage is better, so make it fast, reliably, lightweight

# Minimum planned features and behaviours
## Generally
- every texts should be translatable from an external source, possibly by an optional {label: translation} structured object
- multilanguage
- clear buton (small x next next to the label)
- **if the label's text is too long, the text overflow is set to ellipse (...)**
- optionally (not priority) the dropdown can be rendered at the end of the body
- can order the (rendered) options by the text (should be able to turn it off)
- option source should come from an external api (subscribe on it, when initializing the select), or from an Array<{value: string, text: string}>
- flexible
- optionally the select can have a default (empty) option (null, if not set, true, if mut set)
- the default option (value: '', text: '') can be overriden by a custom default option
- if the default option is true, resetting the select, or setting the value to null will automatically change the value to the default option
- if empty, and a new value is set on it through a change api, the value will be held back, but not set, until an option source gets set
- if the options are in the select, the incoming value will be tried to set, or thrown away, if the options has no item with the given value
- the value of the select must be possible to retrieve through a single property, or a function
- optionally adding a filter input to the dropdown
- dropdown is rendered next to the select button
- maximum and minimum dropdown height
- optionally, the select accepts a parameter, which tells it to open the dropdown over or under the select (under is the default)
- if there are more space over the select, and cannot fully render the dropdown under the select, the dropdown opens over the button
- on window resize, the dropdown's height and position must be calculated again
- dropdown closes
    - on window scroll
    - **on offclick**
- events on everything (by default onInit, onOptionChange, onValueChange, onOpen, onClose, onDestroy), but additional eventemitters can be created inside the plugin
- set value directly through an api
- open and close the dropdown from code
- setting for close dropdown on select (if same code works under select and multiselect, multiselect shouldn't close on element selection)
- has tabindex (user will be able to navigate on it with tab in a form)
- original select is of course next to the select
- render callBack api for the select button, label, dropdown, options
- hotkey capability, because arrow navigation, space opening and selection with enter could make using it easier
- aria for accessibility
## Normal select
- on option selection, the dropdown closes by default
- default option (usually empty) can be added with a single addDefaultOption: true setting
## Multiselect
- dropdown stays open if an option is selected (can be changed, but shouldn't)
- hideable "select all" button at the top of the dropdown


# License
https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)
