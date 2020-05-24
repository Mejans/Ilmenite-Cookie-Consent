/**
 * Internal dependencies
 */
import { removeBanner, showBanner } from './banner';
import { hasUserSetPreferences, setConsentedCategories, setHasSetPreferences } from './consent';
import { getJsonCookieValue } from './cookies';
import { log, logDebug, logInfo } from './log';
import { settings } from './settings';

log( '=========== COOKIE CONSENT DEBUGGING ===========' );

logInfo( 'Blacklisted Domains' );
logInfo( window.YETT_BLACKLIST );
logInfo( 'Whitelisted Domains' );
logInfo( window.YETT_WHITELIST );

/**
 * If the user has not already consented, show the banner.
 */
if ( hasUserSetPreferences() ) {
	logDebug( '✅ User has expressed consent.' );
	logDebug( 'The following categories were granted:' );
	logDebug( getJsonCookieValue( settings.consentedCategories ) );
} else {
	logDebug( '❌ User has not expressed consent.' );
	showBanner();
}

document.querySelector( '.js--ilcc-cookie-consent-close' ).addEventListener( 'click', function( e ) {
	e.preventDefault();

	window.yett.unblock();

	removeBanner();
	setHasSetPreferences();
	setConsentedCategories( [
		'necessary',
		'marketing',
		'analytics',
	] );
} );

document.querySelector( '.js--ilcc-cookie-consent-necessary' ).addEventListener( 'click', function( e ) {
	e.preventDefault();

	removeBanner();
	setHasSetPreferences();
	setConsentedCategories( [
		'necessary',
	] );
} );
