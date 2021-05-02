$( document ).ready(function() {
  $('#menu-dash-ssdi').addClass('mm-active');
  // getdash('kalibrasi');
  $('.js-gauge--1').kumaGauge({
				value : Math.floor((Math.random() * 99) + 1),
        radius : 130,
			});

			$('.js-gauge--1').kumaGauge('update', {
				value : Math.floor((Math.random() * 99) + 1)
			});

			$('.js-gauge--2').kumaGauge({
				value : Math.floor((Math.random() * 99) + 1),
				fill : '#F34A53',
				gaugeBackground : '#1E4147',
				gaugeWidth : 250,
				showNeedle : false,
				label : {
		            display : true,
		            left : 'Min',
		            right : 'Max',
		            fontFamily : 'Helvetica',
		            fontColor : '#1E4147',
		            fontSize : '11',
		            fontWeight : 'bold'
		        }
			});


			var update = setInterval(function() {
				var newVal = Math.floor((Math.random() * 99) + 1);
				$('.js-gauge--1').kumaGauge('update',{
					value : newVal
				});
			}, 1000);

      dash('bar1','chart-apex-bar1');
      dash('bar2','chart-apex-bar2');
      dash('bar3','chart-apex-bar3');
      dash('bar4','chart-apex-bar4');
      dash('bar5','chart-apex-bar5');
      dash('bar6','chart-apex-bar6');
      dash('bar7','chart-apex-bar7');
});

function getdash(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'getDash',
        data : {
                param      : param,
         },
        success: function(result){
          // console.log(result);
          let categories = [];
          let trackgauge = [];
          let back_to_back = [];
          let vernier_calipper = [];

          let diterima = [];
          let ditolak = [];

          let total = [];

          for (var i = 0; i < result.length; i++) {
            categories.push(result[i].nama_pemilik_alat_ukur);
            trackgauge.push(result[i].trackgauge);
            back_to_back.push(result[i].back_to_back);
            vernier_calipper.push(result[i].vernier_calipper);
            diterima.push(parseInt(result[i].diterima));
            ditolak.push(parseInt(result[i].ditolak));
            total.push(parseInt(result[i].total));
          }

          let total_diterima = diterima.reduce((a, b) => a + b, 0);
          let total_ditolak = ditolak.reduce((a, b) => a + b, 0);


          let persen_diterima = (total_diterima/(total_diterima+total_ditolak))*100;
          let persen_ditolak = (total_ditolak/(total_diterima+total_ditolak))*100;

          var options_bar = {
            series: [{
            name: 'Track Gauge',
            data: trackgauge
          }, {
            name: 'Back to back',
            data: back_to_back
          }, {
            name: 'Vernier calipper',
            data: vernier_calipper
          }],
            chart: {
            type: 'bar',
            height: 600
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '80%',
              endingShape: 'flat',
              colors: {
                  ranges: [{
                      from: 0,
                      to: 0,
                      color: undefined
                  }],
                  backgroundBarColors: [],
                  backgroundBarOpacity: 1,
                  backgroundBarRadius: 0,
              },
            },
          },
          colors: ['#5b9bd5', '#ed7d31', '#a5a5a5'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: false,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: categories,
            labels: {
              maxHeight: 300,
              rotate: -90,
            }
          },
          yaxis: {
            title: {
              text: ''
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
          };

          var chart_bar = new ApexCharts(document.querySelector("#chart-apex-columbus"), options_bar);
          chart_bar.render();

          var options_pie = {
          series: [Math.ceil(persen_diterima.toFixed(2)), Math.ceil(persen_ditolak.toFixed(2))],
          chart: {
            width: 400,
            type: 'pie',
          },

          labels: ['Diterima - '+persen_diterima.toFixed(2)+'%', 'Ditolak - '+persen_ditolak.toFixed(2)+'%'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            colors: ['#5b9bd5', '#ed7d31']
          };

        var chart_pie = new ApexCharts(document.querySelector("#chart-apex-columbus-pie"), options_pie);
        chart_pie.render();

        var options = {
          series: [{
          name: 'Total',
          data: total
        }],
          chart: {
          height: 600,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: categories,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          },
          labels: {
            maxHeight: 300,
            rotate: -90,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "";
            }
          }

        },
        title: {
          text: '',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart-apex-columbus-tab"), options);
        chart.render();

        }
      })
    }

function dash(type, id){
      var options = {};

      switch (type) {
        case 'bar1':
        options = {
            series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }],
            chart: {
            height: 250,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },

          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              }
            }

          },
          title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
          };
          break;
        case 'bar2':
          options = {
              series: [{
              name: 'Males',
              data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
                3.9, 3.5, 3
              ]
            },
            {
              name: 'Females',
              data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,
                -4.1, -4, -4.1, -3.4, -3.1, -2.8
              ]
            }
            ],
              chart: {
              type: 'bar',
              height: 250,
              stacked: true
            },
            colors: ['#008FFB', '#FF4560'],
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: '80%',
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 1,
              colors: ["#fff"]
            },

            grid: {
              xaxis: {
                lines: {
                  show: false
                }
              }
            },
            yaxis: {
              min: -5,
              max: 5,
              title: {
                // text: 'Age',
              },
            },
            tooltip: {
              shared: false,
              x: {
                formatter: function (val) {
                  return val
                }
              },
              y: {
                formatter: function (val) {
                  return Math.abs(val) + "%"
                }
              }
            },
            title: {
              text: 'Mauritius population pyramid 2011'
            },
            xaxis: {
              categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
                '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
                '0-4'
              ],
              title: {
                text: 'Percent'
              },
              labels: {
                formatter: function (val) {
                  return Math.abs(Math.round(val)) + "%"
                }
              }
            },
            };
          break;
        case 'bar3':
        options = {
            series: [{
            name: 'Males',
            data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
              3.9, 3.5, 3
            ]
          },
          {
            name: 'Females',
            data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,
              -4.1, -4, -4.1, -3.4, -3.1, -2.8
            ]
          }
          ],
            chart: {
            type: 'bar',
            height: 250,
            stacked: true
          },
          colors: ['#008FFB', '#FF4560'],
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '80%',
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },

          grid: {
            xaxis: {
              lines: {
                show: false
              }
            }
          },
          yaxis: {
            min: -5,
            max: 5,
            title: {
              // text: 'Age',
            },
          },
          tooltip: {
            shared: false,
            x: {
              formatter: function (val) {
                return val
              }
            },
            y: {
              formatter: function (val) {
                return Math.abs(val) + "%"
              }
            }
          },
          title: {
            text: 'Mauritius population pyramid 2011'
          },
          xaxis: {
            categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
              '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
              '0-4'
            ],
            title: {
              text: 'Percent'
            },
            labels: {
              formatter: function (val) {
                return Math.abs(Math.round(val)) + "%"
              }
            }
          },
          };
          break;
          case 'bar4':
          options = {
              series: [{
              name: 'Inflation',
              data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
            }],
              chart: {
              height: 250,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },

            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }

            },
            title: {
              text: 'Monthly Inflation in Argentina, 2002',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
            };
            break;
            case 'bar5':
            options = {
                series: [{
                name: 'Males',
                data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
                  3.9, 3.5, 3
                ]
              },
              {
                name: 'Females',
                data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,
                  -4.1, -4, -4.1, -3.4, -3.1, -2.8
                ]
              }
              ],
                chart: {
                type: 'bar',
                height: 250,
                stacked: true
              },
              colors: ['#008FFB', '#FF4560'],
              plotOptions: {
                bar: {
                  horizontal: true,
                  barHeight: '80%',
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: 1,
                colors: ["#fff"]
              },

              grid: {
                xaxis: {
                  lines: {
                    show: false
                  }
                }
              },
              yaxis: {
                min: -5,
                max: 5,
                title: {
                  // text: 'Age',
                },
              },
              tooltip: {
                shared: false,
                x: {
                  formatter: function (val) {
                    return val
                  }
                },
                y: {
                  formatter: function (val) {
                    return Math.abs(val) + "%"
                  }
                }
              },
              title: {
                text: 'Mauritius population pyramid 2011'
              },
              xaxis: {
                categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
                  '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
                  '0-4'
                ],
                title: {
                  text: 'Percent'
                },
                labels: {
                  formatter: function (val) {
                    return Math.abs(Math.round(val)) + "%"
                  }
                }
              },
              };
              break;
        case 'bar6':
            options = {
                series: [{
                  name: "Desktops",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
              }],
                chart: {
                height: 250,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Product Trends by Month',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              }
              };
          break;
        case 'bar7':
          options = {
              series: [44, 55, 41, 17, 15],
              chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
            };
          break;
        default:

      }

        var chart = new ApexCharts(document.querySelector("#"+id), options);
        chart.render();
}
