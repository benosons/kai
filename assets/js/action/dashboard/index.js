$( document ).ready(function() {
  $('#menu-dashboard').addClass('mm-active');
  // getdash('kalibrasi');
  dash('radialBar','chart-apex-radial');
  dash('radialBar','chart-apex-radial-1');
  dash('radialBar','chart-apex-radial-2');
  dash('radialBar','chart-apex-radial-3');
  dash('radialBar','chart-apex-radial-4');
  dash('radialBar','chart-apex-radial-5');
  dash('radialBar','chart-apex-radial-6');
  dash('radialBar','chart-apex-radial-7');
  dash('line','chart-apex-line');
  dash('bar','chart-apex-bar');
  dash('bar-1','chart-apex-bar-1');
  dash('bar-2','chart-apex-bar-2');
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
        case 'radialBar':
            options = {
              series: [70],
              chart: {
              height: 200,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '70%',
                }
              },
            },
            labels: ['Cricket'],
            };
          break;
        case 'line':
          options = {
              series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
              chart: {
              height: 185,
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
        case 'bar':
          options = {
              series: [{
              name: 'Inflation',
              data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
            }],
              chart: {
              height: 183,
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
        case 'bar-1':
          options = {
              series: [{
              name: 'Marine Sprite',
              data: [44, 55, 41, 37, 22, 43, 21]
            }, {
              name: 'Striking Calf',
              data: [53, 32, 33, 52, 13, 43, 32]
            }, {
              name: 'Tank Picture',
              data: [12, 17, 11, 9, 15, 11, 20]
            }, {
              name: 'Bucket Slope',
              data: [9, 7, 5, 8, 6, 9, 4]
            }, {
              name: 'Reborn Kid',
              data: [25, 12, 19, 32, 25, 24, 10]
            }],
              chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: '100% Stacked Bar'
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1

            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            }
            };
          break;
        case 'bar-2':
            options = {
                series: [{
                name: 'PRODUCT A',
                data: [44, 55, 41, 67, 22, 43]
              }, {
                name: 'PRODUCT B',
                data: [13, 23, 20, 8, 13, 27]
              }, {
                name: 'PRODUCT C',
                data: [11, 17, 15, 15, 21, 14]
              }, {
                name: 'PRODUCT D',
                data: [21, 7, 25, 13, 22, 8]
              }],
                chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                  show: true
                },
                zoom: {
                  enabled: true
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }],
              plotOptions: {
                bar: {
                  borderRadius: 8,
                  horizontal: false,
                },
              },
              xaxis: {
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                  '01/05/2011 GMT', '01/06/2011 GMT'
                ],
              },
              legend: {
                position: 'right',
                offsetY: 40
              },
              fill: {
                opacity: 1
              }
              };
          break;
        default:

      }

        var chart = new ApexCharts(document.querySelector("#"+id), options);
        chart.render();
}
