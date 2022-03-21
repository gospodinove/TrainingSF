
import EnumValue = require('dw/value/EnumValue')
import MarkupText = require('dw/content/MarkupText');
import MediaFile = require('dw/content/MediaFile');

// autogeneratedfile - '/Users/gospodinove/Projects/TrainingSF/data/meta/system-objecttype-extensions.xml'
declare global {
    module ICustomAttributes {

		interface SitePreferences {
			/**
			* Magic page background

				A hexadecimal color value for the Magic page background color.
			* 
			* @source [attribute](file:/Users/gospodinove/Projects/TrainingSF/data/meta/system-objecttype-extensions.xml#5) 
			*/
			magicPageBackground: string | null;

		}
	}
}

declare global {
	interface IGetCustomPreferenceValue {
					/**
			* Magic page background

				A hexadecimal color value for the Magic page background color.
			* 
			* @source [attribute](file:/Users/gospodinove/Projects/TrainingSF/data/meta/system-objecttype-extensions.xml#5) 
			*/
			(name: 'magicPageBackground'): string | null;
			
	}
}