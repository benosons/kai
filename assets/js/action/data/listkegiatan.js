$( document ).ready(function() {
  $('#menu-kegiatan-list').addClass('mm-active');
  loadkegiatan('');
});

function loadkegiatan(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadkegiatan',
        data : {
                param      : param,
         },
        success: function(result){
          console.log(result);
          $('#list-kegiatan').DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 10,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'dokumen', 'sClass':'text-center'},
                        { 'mDataProp': 'indikator_ssd_name'},
                        { 'mDataProp': 'indikator_manager_name'},
                        { 'mDataProp': 'indikator_uraian_name'},
                        { 'mDataProp': 'kegiatan'},
                        { 'mDataProp': 'tanggal'},
                        { 'mDataProp': 'tanggal'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      {
                          mRender: function ( data, type, row ) {
                            var el =
                              `<div class="avatar-icon-wrapper mr-3 avatar-icon-xl btn-hover-shine">
                                                    <div class="avatar-icon rounded">
                                                        <img src="`+data+`" alt="Avatar 5">
                                                    </div>
                                                </div>`;
                              return el;
                          },
                          aTargets: [ 1 ]
                      },
                      {
                          mRender: function ( data, type, row ) {
                            var el =
                              `<button class="mb-2 mr-2 btn btn-xs btn-warning" onclick="action('edit',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-edit" aria-hidden="true" title="Copy to use edit"></i> Edit</button>
                              <button class="mb-2 mr-2 btn btn-xs btn-danger" onclick="action('hapus',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-trash" aria-hidden="true" title="Copy to use edit"></i> Hapus</button>`;
                              return el;
                          },
                          aTargets: [ 7 ]
                      },
                    ],
                    fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                        var index = iDisplayIndexFull + 1;
                        $('td:eq(0)', nRow).html('#'+index);
                        return  index;
                    },
                    fnInitComplete: function () {
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

            }
    });
}

function action(param, id, dokumen){


    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'actionkegiatan',
        data : {
                param      : param,
                id         : id,
                dokumen    : dokumen
         },
        success: function(result){
          swal(
            "Sukses!",
            param.charAt(0).toUpperCase() + param.slice(1)+" Kegiatan!",
            "success"
          ).then((value) => {
            window.location.href = '/kegiatan';
          });
        }
      })
    }
