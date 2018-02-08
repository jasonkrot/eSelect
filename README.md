# eSelect
A select, that revolutionizes the select plugins, and lets the developers customize it as much as possible.

# State
Sill unusable, we just started to work on it.

# Goals
- make it as overwriteable and customizable/extendable as possible
- make it so overwriteable, that almost everything should have an API or a settable option in it.
- avoid using jquery completely
- make it usable on touchscreen devices also
- make it work IE11+, Edge, newer Chrome, Firefox and FF Quantum, Safari, Opera
- less memory and cpu usage is better, so make it fast, reliably, lightweight

# Minimum features
## Generally
- every texts should be translatable from an external source, possibly by an optional Array<{label: string, text: string}>
- multilanguage
- optionally (not priority) the dropdown can be rendered at the end of the body
- can order the (rendered) options by the text (should be able to turn it off)
- opion source should come from an external api (subscribe on it, when initializing the select), or from an Array<{value: string, text: string}>
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

...more incoming

# License
https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)
