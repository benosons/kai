$( document ).ready(function() {
  const page = $('#page').val();
  $('#menu-'+page+'-list').addClass('mm-active');
  loadindikator(page);
});

function loadindikator(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadindikator',
        data : {
                param      : param,
         },
        success: function(result){
          console.log(result);
          if(param == 'ssd'){
            $('#list-'+param).DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 10,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'indikator_1'},
                        { 'mDataProp': 'keterangan'},
                        { 'mDataProp': 'satuan'},
                        { 'mDataProp': 'formula'},
                        { 'mDataProp': 'prioritas'},
                        { 'mDataProp': 'target'},
                        { 'mDataProp': 'pencapaian_1'},
                        { 'mDataProp': 'pencapaian_2'},
                        { 'mDataProp': 'realisasi'},

                    ],
                    order: [[0, 'ASC']],
                    // aoColumnDefs:[
                    //   {
                    //       mRender: function ( data, type, row ) {
                    //         var el =
                    //           `<div class="avatar-icon-wrapper mr-3 avatar-icon-xl btn-hover-shine">
                    //                                 <div class="avatar-icon rounded">
                    //                                     <img src="`+data+`" alt="Avatar 5">
                    //                                 </div>
                    //                             </div>`;
                    //           return el;
                    //       },
                    //       aTargets: [ 1 ]
                    //   },
                    //   {
                    //       mRender: function ( data, type, row ) {
                    //         var el =
                    //           `<button class="mb-2 mr-2 btn btn-xs btn-warning" onclick="action('edit',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-edit" aria-hidden="true" title="Copy to use edit"></i> Edit</button>
                    //           <button class="mb-2 mr-2 btn btn-xs btn-danger" onclick="action('hapus',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-trash" aria-hidden="true" title="Copy to use edit"></i> Hapus</button>`;
                    //           return el;
                    //       },
                    //       aTargets: [ 7 ]
                    //   },
                    // ],
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
          }else{

            $('#list-'+param).DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 10,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'indikator_1'},
                        { 'mDataProp': 'indikator_2'},
                        { 'mDataProp': 'keterangan'},
                        { 'mDataProp': 'satuan'},
                        { 'mDataProp': 'formula'},
                        { 'mDataProp': 'prioritas'},
                        { 'mDataProp': 'target'},
                        { 'mDataProp': 'pencapaian_1'},
                        { 'mDataProp': 'pencapaian_2'},
                        { 'mDataProp': 'realisasi'},

                    ],
                    order: [[0, 'ASC']],
                    // aoColumnDefs:[
                    //   {
                    //       mRender: function ( data, type, row ) {
                    //         var el =
                    //           `<div class="avatar-icon-wrapper mr-3 avatar-icon-xl btn-hover-shine">
                    //                                 <div class="avatar-icon rounded">
                    //                                     <img src="`+data+`" alt="Avatar 5">
                    //                                 </div>
                    //                             </div>`;
                    //           return el;
                    //       },
                    //       aTargets: [ 1 ]
                    //   },
                    //   {
                    //       mRender: function ( data, type, row ) {
                    //         var el =
                    //           `<button class="mb-2 mr-2 btn btn-xs btn-warning" onclick="action('edit',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-edit" aria-hidden="true" title="Copy to use edit"></i> Edit</button>
                    //           <button class="mb-2 mr-2 btn btn-xs btn-danger" onclick="action('hapus',`+row.id+`,'`+row.dokumen+`')"><i class="fa fa-trash" aria-hidden="true" title="Copy to use edit"></i> Hapus</button>`;
                    //           return el;
                    //       },
                    //       aTargets: [ 7 ]
                    //   },
                    // ],
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

function saveindikator(param){
  var formData = new FormData();
  formData.append('indikator_type', param);
  formData.append('indikator_1', $('#'+param+'_indikator_1').val());
  formData.append('indikator_2', $('#'+param+'_indikator_2').val());
  formData.append('keterangan', $('#'+param+'_keterangan').val());
  formData.append('satuan', $('#'+param+'_satuan').val());
  formData.append('formula', $('#'+param+'_formula').val());
  formData.append('prioritas', $('#'+param+'_prioritas').val());
  formData.append('target', $('#'+param+'_target').val());
  formData.append('pencapaian_1', $('#'+param+'_pencapaian_1').val());
  formData.append('pencapaian_2', $('#'+param+'_pencapaian_2').val());
  formData.append('realisasi', $('#'+param+'_realisasi').val());

  $.ajax({
      type: 'post',
      url:'saveindikator',
      data: formData,
      contentType: false,
      processData: false,
      success:function(result){
        swal(
          "Sukses!",
          "Tambah Indikator "+param.toUpperCase()+"!",
          "success"
        ).then((value) => {
          window.location.href = '/'+param;
        });
      }
    })
}
