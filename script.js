

let university = {
    apiKey: "q2bL5TQhLhllNsk2yC6gpzjxnN6eURx105tUfhLC",
    fetchUniversity: function (school, city) {
      fetch(
        "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" +
          school + "&school.city="+city+
          "&_fields=school,latest.admissions,latest.cost,latest.student&api_key="+
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No university found.");
            throw new Error("No university found.");
          }
          return response.json();
        })
        .then((data) => this.displayUniversity(data, school));
    },
    displayUniversity: function (data, search) {

      if(data.results.length==0){
        alert("No university found.");
        throw new Error("No university found.");
      }

      var school = data.results[0]["school.name"];
      var city = data.results[0]["school.city"];
      var state = data.results[0]["school.state"];
      var adm_rate = Number(data.results[0]["latest.admissions.admission_rate.overall"]*100).toFixed(2);
      var cost =data.results[0]["latest.cost.attendance.academic_year"];
      var retention = Number(data.results[0]["latest.student.retention_rate.four_year.full_time"]*100).toFixed(2);
      var std_pop = data.results[0]["latest.student.enrollment.undergrad_12_month"];
      var sat_low=data.results[0]["latest.admissions.sat_scores.25th_percentile.math"]+data.results[0]["latest.admissions.sat_scores.25th_percentile.critical_reading"];
      var sat_high=data.results[0]["latest.admissions.sat_scores.75th_percentile.math"]+data.results[0]["latest.admissions.sat_scores.75th_percentile.critical_reading"];
      var act_low=data.results[0]["latest.admissions.act_scores.25th_percentile.cumulative"];
      var act_high=data.results[0]["latest.admissions.act_scores.75th_percentile.cumulative"];
      var minority=  Number(100*(1-data.results[0]["latest.student.demographics.race_ethnicity.white"])).toFixed(2);

      document.querySelector(".uni").innerText = school;
      document.querySelector(".city").innerText = city+", "+state;
      document.querySelector(".adm-rate").innerText = "Admission Rate: "+adm_rate + "%";
      document.querySelector(".cost").innerText = "Attendance Cost: $"+cost;
      document.querySelector(".retention").innerText = "Retention Rate: "+retention+ "%";
      document.querySelector(".std-pop").innerText = "Total Students: "+std_pop;
      if(sat_low ==0 || sat_low == null||act_low ==0 || act_low == null){
        document.querySelector(".sat").innerText = "SAT Scores: Not Available";
        document.querySelector(".act").innerText = "ACT Scores: Not Available";
      }
      else{
        document.querySelector(".sat").innerText = "SAT Scores: "+ sat_low+"-"+sat_high;
        document.querySelector(".act").innerText = "ACT Scores: "+act_low+"-"+act_high;
      }
      document.querySelector(".minority").innerText = "Minority Population: "+ minority+"%";

      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" +search+"')";
    },

    search: function () {
      this.fetchUniversity(document.querySelector(".search1").value, document.querySelector(".search2").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    university.search();
  });
  
  document
    .querySelector(".search1")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        university.search();
      }
    });
    document
    .querySelector(".search2")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        university.search();
      }
    });
    university.fetchUniversity("LSU","Baton Rouge");