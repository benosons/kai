$( document ).ready(function() {
  window.baseU = $('#baseURL').val();
  $('#menu-kalibrasi').addClass('mm-active');
  getkalibrasi('kalibrasi');

});

function getkalibrasi(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'getDash',
        data : {
                param      : param,
         },
        success: function(result){
          console.log(result);
        var dt = $('#list-kalibrasi').DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 35,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'nama_pemilik_alat_ukur', 'sClass':'text-center'},
                        { 'mDataProp': 'trackgauge'},
                        { 'mDataProp': 'back_to_back'},
                        { 'mDataProp': 'vernier_calipper'},
                        { 'mDataProp': 'diterima'},
                        { 'mDataProp': 'ditolak'},
                        { 'mDataProp': 'total'},

                    ],
                    // order: [0, 'DESC'],
                    aoColumnDefs:[
                      // {
                      //     mRender: function ( data, type, row ) {
                      //       var el =
                      //         `<button class="mb-2 mr-2 btn btn-xs btn-warning" onclick="action('edit',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-edit" aria-hidden="true" title="Copy to use edit"></i> Edit</button>
                      //         <button class="mb-2 mr-2 btn btn-xs btn-danger" onclick="action('hapus',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-trash" aria-hidden="true" title="Copy to use edit"></i> Hapus</button>`;
                      //         return el;
                      //     },
                      //     aTargets: [ 7 ]
                      // },
                    ],
                    fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                        var index = iDisplayIndexFull + 1;
                        $('td:eq(0)', nRow).html('#'+index);
                        return  index;
                    },
                    fnInitComplete: function () {
                        $('#list-kalibrasi tbody tr').css('cursor','pointer' );
                        var that = this;
                        var td ;
                        var tr ;
                        this.$('td').click( function () {
                            td = this;
                        });
                        this.$('tr').click( function () {
                            tr = this;
                        });

                    }
                });

                $('#list-kalibrasi  tbody').on('click', 'tr', function () {
                  var data = dt.row( this ).data();
                  $('#modal-kalib').trigger('click');
                  $('#nama_kalib').text(data.nama_pemilik_alat_ukur);
                  $('#id_kalib').val(data.id);
                  $('#trackgauge_kalib').val(data.trackgauge);
                  $('#btb_kalib').val(data.back_to_back);
                  $('#vernier_calipper_kalib').val(data.vernier_calipper);
                  $('#diterima_kalib').val(data.diterima);
                  $('#ditolak_kalib').val(data.ditolak);
                  $('#total_kalib').val(data.total);
                  // alert( 'You id '+data.id+'\'s row' );
                });


        }
      })
    }

function savekalib(){

  let isObject                    = {};
  isObject.id                     = $('#id_kalib').val();
  isObject.trackgauge             = $('#trackgauge_kalib').val();
  isObject.back_to_back           = $('#btb_kalib').val();
  isObject.vernier_calipper       = $('#vernier_calipper_kalib').val();
  isObject.diterima               = $('#diterima_kalib').val();
  isObject.ditolak                = $('#ditolak_kalib').val();
  isObject.total                  = $('#total_kalib').val();

  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'actionkalibrasi',
    data :{
      param	    : isObject,
    },
    success: function(response){
      swal(
        "Sukses!",
        "Update "+$('#nama_kalib').text()+" !",
        "success"
      ).then((value) => {
        window.location.href = window.baseU+'kalibrasi';
      });
    }
  });
}
