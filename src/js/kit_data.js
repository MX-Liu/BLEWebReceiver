
const EISID = 1;
const IMUID = 2;
const OSID = 3;

var datasaveBuff = ['\n'];
var IMUDataBuff = ['\n'];
var EISDataBuff = ['\n'];
var OSDataBuff = ['\n'];

var storedata = 0;
var LastDataType = 0;

var label = 0;
// var databundle = {
//     dataID:0,
//     current:0,
//     voltage:0,
//     frequency:0,
//     magnitude:0,
//     phase:0,
//     LightCh1: 0,
//     LightCh2: 0,
//     LightCh3: 0,
//     LightCh4: 0,
//     LightCh5: 0,
//     LightCh6: 0,
//     LightCh7: 0,
//     LightCh8: 0,
//     LightCh9: 0,
//     LightCh10: 0,
// }


var databundle = {
    dataID: 0,
    // magnitude: 0,
    // phase: 0,
    magnitude1: 0,
    phase1: 0,
    magnitude2: 0,
    phase2: 0,
    magnitude3: 0,
    phase3: 0,
    magnitude4: 0,
    phase4: 0,

    Ax: 0,
    Ay: 0,
    Az: 0,
    Gx: 0,
    Gy: 0,
    Gz: 0,
    LightCh1: 0,
    LightCh2: 0,
    LightCh3: 0,
    LightCh4: 0,
    LightCh5: 0,
    LightCh6: 0,
    LightCh7: 0,
    LightCh8: 0,
    LightCh9: 0,
    LightCh10: 0,
}





function f_hello() {
    console.log("all systems go");
}

var count = 0;

// handle incoming data:
function handleData(event) {
    // get the data  from the peripheral:
    // console.log(event.target.value)
    var mToc;
    databundle.dataID = event.target.value.getInt32(0, true);

    console.log(event.target.value.getFloat32(0, true));
    // console.log(event.target.value.getFloat32(8,true))

    if (databundle.dataID == EISID) {
        databundle.frequency = event.target.value.getFloat32(4, true);
        databundle.magnitude1 = event.target.value.getFloat32(8, true);
        databundle.phase1 = event.target.value.getFloat32(12, true);

        databundle.magnitude2 = event.target.value.getFloat32(16, true);
        databundle.phase2 = event.target.value.getFloat32(20, true);

        databundle.magnitude3 = event.target.value.getFloat32(24, true);
        databundle.phase3 = event.target.value.getFloat32(28, true);

        databundle.magnitude4 = event.target.value.getFloat32(32, true);
        databundle.phase4 = event.target.value.getFloat32(36, true);


        mToc = new Date().getTime();
        EISDataBuff.push(mToc);
        EISDataBuff.push(databundle.frequency);
        EISDataBuff.push(databundle.magnitude1);
        EISDataBuff.push(databundle.phase1);
        EISDataBuff.push(databundle.magnitude2);
        EISDataBuff.push(databundle.phase2);
        EISDataBuff.push(databundle.magnitude3);
        EISDataBuff.push(databundle.phase3);
        EISDataBuff.push(databundle.magnitude4);
        EISDataBuff.push(databundle.phase4);
        EISDataBuff.push(label);


        // EISDataBuff.push(databundle.magnitude*Math.cos(databundle.phase));
        // EISDataBuff.push(databundle.magnitude*Math.sin(databundle.phase));

        EISDataBuff.push("\n");
    }
    if (databundle.dataID == IMUID) {
        databundle.Ax = event.target.value.getFloat32(4, true);
        databundle.Ay = event.target.value.getFloat32(8, true);
        databundle.Az = event.target.value.getFloat32(12, true);

        databundle.Gx = event.target.value.getFloat32(16, true);
        databundle.Gy = event.target.value.getFloat32(20, true);
        databundle.Gz = event.target.value.getFloat32(24, true);
        mToc = new Date().getTime();
        IMUDataBuff.push(mToc);
        IMUDataBuff.push(databundle.Ax);
        IMUDataBuff.push(databundle.Ay);
        IMUDataBuff.push(databundle.Az);
        IMUDataBuff.push(databundle.Gx);
        IMUDataBuff.push(databundle.Gy);
        IMUDataBuff.push(databundle.Gz);
        IMUDataBuff.push(label);
        IMUDataBuff.push("\n");
    }

    if (databundle.dataID == OSID) {
        databundle.LightCh1 = event.target.value.getUint16(4, true);
        databundle.LightCh2 = event.target.value.getUint16(6, true);
        databundle.LightCh3 = event.target.value.getUint16(8, true);
        databundle.LightCh4 = event.target.value.getUint16(10, true);
        databundle.LightCh5 = event.target.value.getUint16(12, true);
        databundle.LightCh6 = event.target.value.getUint16(14, true);
        databundle.LightCh7 = event.target.value.getUint16(16, true);
        databundle.LightCh8 = event.target.value.getUint16(18, true);
        databundle.LightCh9 = event.target.value.getUint16(20, true);
        databundle.LightCh10 = event.target.value.getUint16(22, true);

        // mToc = new Date().getTime();
        // OSDataBuff.push(mToc);
        OSDataBuff.push(databundle.LightCh1);
        OSDataBuff.push(databundle.LightCh2);
        OSDataBuff.push(databundle.LightCh3);
        OSDataBuff.push(databundle.LightCh4);
        OSDataBuff.push(databundle.LightCh5);
        OSDataBuff.push(databundle.LightCh6);
        OSDataBuff.push(databundle.LightCh7);
        OSDataBuff.push(databundle.LightCh8);
        OSDataBuff.push(databundle.LightCh9);
        OSDataBuff.push(databundle.LightCh10);
        OSDataBuff.push("\n");
    }


    updatePlots(databundle); // NB need to invert to match sensor coordinate system to our 3d model

    // if (LastDataType != databundle.dataID && LastDataType != 0) {
    //     download_IMU();
    //     download_EIS();
    // }
    if (storedata == 1) {
        storedata = 0;
        download_IMU();
    }
    // LastDataType = databundle.dataID;
}


var textFile = null;

function makeTextFile(text) {
    var data = new Blob([text], { type: 'text/plain' });
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
};

function download_IMU() {
    console.log(databundle.dataID);
    var link = document.createElement('a');
    var store_date = new Date().getTime();
    link.setAttribute('download', 'IMU_' + File_Name + '_' + store_date + '.txt');
    link.href = makeTextFile(IMUDataBuff);
    document.body.appendChild(link);
    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
}

function download_EIS() {
    console.log(databundle.dataID);
    var link = document.createElement('a');
    var store_date = new Date().getTime();
    link.setAttribute('download', 'EIS_' + File_Name + '_' + store_date + '.txt');
    link.href = makeTextFile(EISDataBuff);
    document.body.appendChild(link);
    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
    storedata = 1;
}


function updataLabel() {
    label = activityLabel;
}



