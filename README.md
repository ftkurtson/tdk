BaseKit Template SDK
====================

The BaseKit Template SDK provides an emulator to render a template's Twig and LESS files. There is support for rendering all types of widget.

The build file included can be used to pull in all the required files from the main BaseKit code base. For example, widget Twig and JS files are all included in this repository and therefore need to be regularly updated.

For more on template creation, please refer to the template development kit [documentation](http://basekit-templates.github.io/template-docs/).

###Updates 2013-11-28

- Updated less library to v1.5.0 
- Added basekit-bootstrap.less to template common 
- Support for @{templateCommon} in LESS; will insert string pointing to template common directory; `/templates/common/`
- Support for @{templateLocal} in LESS; will insert string pointing to the current template's directory; `/templates/templatename/`
- Updated the Pearl templates 
- Rebuilt the widgets to include BaseKit's `release/12` updates.
