(function() {
  var darkSwitch = document.getElementById("darkSwitch");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function(event) {
      console.log("Dark switch invoked!")
      resetTheme();
    });
    function initTheme() {
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.checked = darkThemeSelected;
      darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
    }
    function resetTheme() {
      if (darkSwitch.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
      } else {
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("darkSwitch");
      }
    }
  }
})();

(function() {
  var darkSwitch = document.getElementById("darkModeIcon");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("click", function(event) {
      console.log("Dark switch invoked!")
      resetTheme();
    });
    function initTheme() {
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.checked = darkThemeSelected;
      darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark") 
        : document.body.removeAttribute("data-theme");

      if (darkThemeSelected){
        document.getElementById("darkModeText").innerHTML=`Turn Lights On`;
        document.getElementById("darkModeText").className="zmdi zmdi-brightness-5";
      }
      else {
        document.getElementById("darkModeText").innerHTML=`Turn Lights Off`;
        document.getElementById("darkModeText").className="zmdi zmdi-brightness-3";
      }
    }
    function resetTheme() {
      if (darkSwitch.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
        document.getElementById("darkModeText").innerHTML=`Turn Lights On`;
        document.getElementById("darkModeText").className="zmdi zmdi-brightness-5";
      } else {
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("darkSwitch");
        document.getElementById("darkModeText").innerHTML=`Turn Lights Off`;
        document.getElementById("darkModeText").className="zmdi zmdi-brightness-3";
      }
    }
  }
})();

