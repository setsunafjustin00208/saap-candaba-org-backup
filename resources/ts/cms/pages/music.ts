import Alpine from 'alpinejs';
import * as $ from 'jquery';

const checkLibraryLoaded = (library: any, libraryName: string) => {
    if (typeof library !== 'undefined') {
        console.log(`${libraryName} is loaded`);
    } else {
        console.log(`${libraryName} is not loaded`);
    }
};

checkLibraryLoaded(Alpine, 'Alpine.js');
checkLibraryLoaded($, 'jQuery');