// resolve1!!��return���Ƥ��뤿�ᡢ�����ͤ�resolve�����
async function resolveSample() {
    return 'resolve!!';
}

// resolveSample��Promise���֤���resolve!!��resolve����뤿��
// then()���¹Ԥ��쥳�󥽡����resolve!!��ɽ�������
await Promise.all( [resolveSample()] );

//.then(value => {
    console.log(value); // => resolve!!
//});


// reject!!��throw���Ƥ��뤿�ᡢ�����ͤ�reject�����
async function rejectSample() {
    throw new Error('reject!!');
}

// rejectSample��Promise���֤���reject!!��reject����뤿��
// catch()���¹Ԥ��쥳�󥽡����reject!!��ɽ�������
rejectSample().catch(err => {
    console.log(err); // => reject!!
});


// resolveError��async function�ǤϤʤ����ᡢPromise���֤��ʤ�
function resolveError() {
    return 'resolveError!!';
}

// resolveError��Promise���֤��ʤ����ᡢ���顼��ȯ������ư���ʤ�
// Uncaught TypeError: resolveError(...).then is not a function
resolveError().then(value => {
    console.log(value);
});
