/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function loadPDF1() {
  console.log('loadPDF1');
  document.location.href='docs/documento.pdf';
}

function loadPDF2() {
  console.log('loadPDF2');
  var ref = cordova.InAppBrowser.open('docs/documento.pdf', '_blank', 'location=no');
}

function loadPDF3() {
  console.log('loadPDF3');
  console.log(cordova.file.applicationDirectory);
  window.resolveLocalFileSystemURL(cordova.file.applicationDirectory +  'www/docs/documento.pdf', function(fileEntry) {
      
      window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dirEntry) {
          
          fileEntry.copyTo(dirEntry, 'file.pdf', function(newFileEntry) {


              cordova.plugins.fileOpener2.open(newFileEntry.nativeURL,'application/pdf',
              { 
                  error : function(e) { 
                      console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                  },
                  success : function () {
                      console.log('file opened successfully'); 				
                  }
              }
              );
          });
      });
  });
}

    document.querySelector('#loadPDF1').addEventListener('touchend', loadPDF1,false);
    document.querySelector('#loadPDF2').addEventListener('touchend', loadPDF2,false);
    document.querySelector('#loadPDF3').addEventListener('touchend', loadPDF3,false);
