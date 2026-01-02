/**
 * Folding Instructions Page JavaScript
 * Handles dynamic display of folding instructions based on user-selected zine configuration
 */

/**
 * Refreshes the displayed instruction section based on current radio button selections
 * Builds a code string from selections and shows the matching instruction section
 */
function refreshSpecs() {
    // Hide all instruction sections
    document.querySelectorAll('.instruction-section').forEach(function(section) {
        section.classList.remove('active');
    });
    
    // Build specification code from radio button selections
    let specCode = "";
    
    // Zine size: e=eighth, q=quarter, h=half
    if (document.getElementById("zs-mini").checked) {
        specCode += "e";
    } else if (document.getElementById("zs-half").checked) {
        specCode += "h";
    } else {
        specCode += "q";
    }
    
    // For half-size, only orientation matters (no duplex/spine options)
    if (specCode === "h") {
        // Orientation: p=portrait, l=landscape
        if (document.getElementById("ori-portrait").checked) {
            specCode += "p";
        } else {
            specCode += "l";
        }
    } else {
        // For eighth and quarter sizes
        // Duplex: 2=double-sided, 1=single-sided
        if (document.getElementById("dx-double").checked) {
            specCode += "2";
        } else {
            specCode += "1";
        }
        
        // Orientation: p=portrait, l=landscape
        if (document.getElementById("ori-portrait").checked) {
            specCode += "p";
        } else {
            specCode += "l";
        }
        
        // Spine position: s=side, t=top
        if (document.getElementById("spine-side").checked) {
            specCode += "s";
        } else {
            specCode += "t";
        }
    }
    
    // Show the instruction section matching the spec code
    const selectedSection = document.getElementById(specCode);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

/**
 * Loads specification from URL query string and sets radio buttons accordingly
 * @param {string} specString - Specification code (e.g., "e2ps", "q1lt", "hp")
 */
function loadSpecs(specString) {
    if (specString.length >= 2) {
        // First character: zine size
        if (specString.charAt(0) === "e") {
            document.getElementById("zs-mini").checked = true;
        } else if (specString.charAt(0) === "h") {
            document.getElementById("zs-half").checked = true;
        } else {
            document.getElementById("zs-qtr").checked = true;
        }
        
        // For half-size, only 2 characters (size + orientation)
        if (specString.charAt(0) === "h") {
            if (specString.charAt(1) === "p") {
                document.getElementById("ori-portrait").checked = true;
            } else {
                document.getElementById("ori-landscape").checked = true;
            }
        } else if (specString.length >= 4) {
            // For eighth and quarter: 4 characters (size + duplex + orientation + spine)
            
            // Second character: duplex
            if (specString.charAt(1) === "1") {
                document.getElementById("dx-single").checked = true;
            } else {
                document.getElementById("dx-double").checked = true;
            }
            
            // Third character: orientation
            if (specString.charAt(2) === "p") {
                document.getElementById("ori-portrait").checked = true;
            } else {
                document.getElementById("ori-landscape").checked = true;
            }
            
            // Fourth character: spine
            if (specString.charAt(3) === "s") {
                document.getElementById("spine-side").checked = true;
            } else {
                document.getElementById("spine-top").checked = true;
            }
        }
    }
    
    // Refresh to show the appropriate instruction section
    refreshSpecs();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for URL query string parameters
    if (location.search !== "") {
        // Remove the leading '?' and load specs
        loadSpecs(location.search.substring(1));
    } else {
        // No URL params, just refresh to show default selection
        refreshSpecs();
    }
});
