BaseKit Template SDK
====================

The BaseKit Template SDK provides an emulator to render a template's Twig and LESS files. There is support for rendering all types of widget.

The build file included can be used to pull in all the required files from the main BaseKit code base. For example, widget Twig and JS files are all included in this repository and therefore need to be regularly updated.

For more on template creation, please refer to the template development kit [documentation](http://developers.basekit.com).

###Updates 2014-03-30
Build for version 7.22
 - Added LESS validation for validator. Find those LESS bugs easily!
 - Added basekit-bootstrap version 2.1

###Updates 2014-03-16
Build for version 7.20
- Pulls page types from the template
- Still issue with Google Font Load times. Fix coming in release/7.21
- Removed requirement for color and font swatches


###Updates 2013-11-28

- Updated less library to v1.5.0 
- Added basekit-bootstrap.less to template common 
- Support for @{templateCommon} in LESS; will insert string pointing to template common directory; `/templates/common/`
- Support for @{templateLocal} in LESS; will insert string pointing to the current template's directory; `/templates/templatename/`
- Updated the Pearl templates 
- Rebuilt the widgets to include BaseKit's `release/7.12` updates.
