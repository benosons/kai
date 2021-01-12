$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  window.baseURL = $('#baseURL').val();
  loadkegiatan('');
});

function detailissue(id){
  $('#issueModal').modal({backdrop: 'static', keyboard: false})

  $('#issueModal').modal({
    show: true
  });
}

function loadkegiatan(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadso',
        data : {
                param      : param,
         },
        success: function(result){
          console.log(result);
          for (var i = 0; i < result.length; i++) {
              $('#foto-'+result[i].id).attr('src', window.baseURL+result[i].foto);
              $('#singkatan-'+result[i].id).text(result[i].singkatan);
              $('#nama_jabatan-'+result[i].id).text(result[i].nama_jabatan);
              $('#nama_pejabat-'+result[i].id).text(result[i].nama_pejabat);
              $('#nipp-'+result[i].id).text(result[i].nipp);
          }
        }
      });
    }
