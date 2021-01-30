$( document ).ready(function() {
  const baseU = $('#baseURL').val();
  const page = $('#page').val();
  $('#menu-'+page+'-list').addClass('mm-active');
  loadindikator(page);

  $('#tanggal_keluar, #rka_update_tanggal').on('click', function(){
    $('.datepicker-container').css({ 'z-index' : '5000'});
  });

  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  $('[data-target="#modaldokumen"]').on('click', function(){
    $('#id_dokumen').val('');
    $('#jenis_dokumen').val(0).trigger("change");
    $('#nama_dokumen').val('');
    $('#nomor_dokumen').val('');
    $('#uraian_singkat').val('');
    $('#tanggal_keluar').val('');
  });

  $('[data-target="#modalrka"]').on('click', function(){
    $('#id_rka').val('');
    $('#rka_tahun').val(0);
    $('#rka_update_tanggal').val('');
    $('#rka_program').val('');
    $('#rka_realisasi').val('');
    $('#rka_penyerapan').val('');
  });

  $('#rka_realisasi, #rka_program').on('change', function(){
    $('#rka_penyerapan').val($('#rka_realisasi').val()/ $('#rka_program').val());
  });

  var max = new Date().getFullYear();
  var min = max - 5;
  var opt = '<option value="0">-Pilih-</option>';
  for (var i = min; i<=max; i++){
      opt += '<option value="'+i+'">'+i+'</option>;'
  }

  $('#rka_tahun').html(opt);

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
          }else if(param == 'dokumen'){
            $('#list-dokumen').DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 10,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'jenis_dokumen'},
                        { 'mDataProp': 'nama_dokumen'},
                        { 'mDataProp': 'nomor_dokumen'},
                        { 'mDataProp': 'uraian_singkat'},
                        { 'mDataProp': 'tanggal_keluar'},
                        { 'mDataProp': 'dokumen'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      // {
                      //     mRender: function ( data, type, row ) {
                      //       var el =
                      //         `<div class="avatar-icon-wrapper mr-3 avatar-icon-xl btn-hover-shine">
                      //                               <div class="avatar-icon rounded">
                      //                                   <img src="`+data+`" alt="Avatar 5">
                      //                               </div>
                      //                           </div>`;
                      //         return el;
                      //     },
                      //     aTargets: [ 1 ]
                      // },
                      {
                          mRender: function ( data, type, row ) {
                            var el =
                              `<div role="group" class="btn-group-sm btn-group btn-group-toggle">
                                                        <a data-toggle="tooltip" title="Download !" type="button" class="btn btn-success" href="`+baseU+row.dokumen+`"><i class="fa fa-download"></i></a>
                                                        <button data-toggle="tooltip" title="Edit !" type="button" class="btn btn-warning" onclick="actiondokumen('edit', '`+row.id+`', '`+row.jenis_dokumen+`', '`+row.nama_dokumen+`', '`+row.uraian_singkat+`', '`+row.tanggal_keluar+`', '`+row.nomor_dokumen+`', '`+row.dokumen+`')"><i class="fa fa-edit"></i></button>
                                                        <button data-toggle="tooltip" title="Delete !" type="button" class="btn btn-danger" onclick="actiondokumen('delete', '`+row.id+`', '`+row.jenis_dokumen+`', '`+row.nama_dokumen+`', '`+row.uraian_singkat+`', '`+row.tanggal_keluar+`', '`+row.nomor_dokumen+`', '`+row.dokumen+`')"><i class="fa fa-trash-alt"></i></button>
                                                    </div>`;

                              return el;
                          },
                          aTargets: [ 6 ]
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
          }else if(param == 'rka'){
            $('#list-rka').DataTable({
                    aaData: result,
                    lengthChange: false,
                    pageLength: 10,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'rka_tahun'},
                        { 'mDataProp': 'rka_update_tanggal'},
                        { 'mDataProp': 'rka_program'},
                        { 'mDataProp': 'rka_realisasi'},
                        { 'mDataProp': 'rka_penyerapan'},
                        { 'mDataProp': 'rka_dokumen'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      {
                          mRender: function ( data, type, row ) {
                            var el =
                              `<div role="group" class="btn-group-sm btn-group btn-group-toggle">
                                                        <button data-toggle="tooltip" title="Edit !" type="button" class="btn btn-warning" onclick="actionrka('edit', '`+row.id+`', '`+row.rka_tahun+`', '`+row.rka_update_tanggal+`', '`+row.rka_program+`', '`+row.rka_realisasi+`', '`+row.rka_penyerapan+`')"><i class="fa fa-edit"></i></button>
                                                        <button data-toggle="tooltip" title="Delete !" type="button" class="btn btn-danger" onclick="actionrka('delete', '`+row.id+`', '`+row.rka_tahun+`', '`+row.rka_update_tanggal+`', '`+row.rka_program+`', '`+row.rka_realisasi+`', '`+row.rka_penyerapan+`')"><i class="fa fa-trash-alt"></i></button>
                                                    </div>`;

                              return el;
                          },
                          aTargets: [ 6 ]
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
            window.location.href = baseU+'kegiatan';
          });
        }
      })
    }

function saveindikator(param){
  var formData = new FormData();
  var files = $('#customFile')[0].files;

  if(param == 'dokumen'){
    formData.append('table', param);
    formData.append('id', $('#id_dokumen').val());
    formData.append('jenis_dokumen', $('#jenis_dokumen').val());
    formData.append('nama_dokumen', $('#nama_dokumen').val());
    formData.append('uraian_singkat', $('#uraian_singkat').val());
    formData.append('tanggal_keluar', $('#tanggal_keluar').val());
    formData.append('nomor_dokumen', $('#nomor_dokumen').val());
    formData.append('file_data',files[0]);

  }else if(param == 'rka'){
    formData.append('table', param);
    formData.append('id', $('#id_rka').val());
    formData.append('rka_tahun', $('#rka_tahun').val());
    formData.append('rka_update_tanggal', $('#rka_update_tanggal').val());
    formData.append('rka_program', $('#rka_program').val());
    formData.append('rka_realisasi', $('#rka_realisasi').val());
    formData.append('rka_penyerapan', $('#rka_penyerapan').val());
    formData.append('rka_dokumen', $('#rka_dokumen').val());
  }else{
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
  }

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
          window.location.href = baseU+param;
        });
      }
    })
}

function actiondokumen(param, id, jenis_dokumen,nama_dokumen,uraian_singkat,tanggal_keluar,nomor_dokumen,dokumen){
  if(param == 'edit'){

    $('[data-target="#modaldokumen"]').trigger('click');
    $('#id_dokumen').val(id);
    $('#jenis_dokumen').val(jenis_dokumen).trigger('change');
    $('#nama_dokumen').val(nama_dokumen);
    $('#nomor_dokumen').val(nomor_dokumen);
    $('#uraian_singkat').val(uraian_singkat);
    $('#tanggal_keluar').val(tanggal_keluar);
  }else if(param == 'delete'){
    swal({
      title: "Anda, Yakin?",
      text: "Dokumen yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      buttons: true,
      cancel: "Batal",
      buttons: "Hapus",
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var formData = new FormData();
        formData.append('table', 'dokumen');
        formData.append('id', id);
        formData.append('dokumen', dokumen);
        $.ajax({
            type: 'post',
            url:'actionindikator',
            data: formData,
            contentType: false,
            processData: false,
            success:function(result){
              swal({
                title: "Sukses",
                text: "Dokumen telah dihapus!",
                icon: "success",
                buttons: true,
                buttons: "Ok",
              }).then((value) => {
                window.location.href = baseU+'dokumen';
              });
            }
          })
      }
    });
  }
};

function actionrka(param, id, rka_tahun,rka_update_tanggal,rka_program,rka_realisasi,rka_penyerapan){
  if(param == 'edit'){

    $('[data-target="#modalrka"]').trigger('click');
    $('#id_rka').val(id);
    $('#rka_tahun').val(rka_tahun);
    $('#rka_update_tanggal').val(rka_update_tanggal);
    $('#rka_program').val(rka_program);
    $('#rka_realisasi').val(rka_realisasi);
    $('#rka_penyerapan').val(rka_penyerapan);
  }else if(param == 'delete'){
    swal({
      title: "Anda, Yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      buttons: true,
      cancel: "Batal",
      buttons: "Hapus",
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var formData = new FormData();
        formData.append('table', 'rka');
        formData.append('id', id);

        $.ajax({
            type: 'post',
            url:'actionindikator',
            data: formData,
            contentType: false,
            processData: false,
            success:function(result){
              swal({
                title: "Sukses",
                text: "Hapus Data RKA!",
                icon: "success",
                buttons: true,
                buttons: "Ok",
              }).then((value) => {
                window.location.href = baseU+'rka';
              });
            }
          })
      }
    });
  }
};
