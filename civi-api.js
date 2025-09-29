function API_createReport(record) {
    const all = storageGetAll();
    all.unshift(record);
    storageSaveAll(all);
    return record;
}

async function createReport(reportData, files = {}) {
    const formData = new FormData();
    Object.keys(reportData).forEach(key => {
        formData.append(key, reportData[key]);
    });
    if (files.photo) formData.append('photo', files.photo);

    const response = await apiRequest('/reports', {
        method: 'POST',
        body: formData
    });
    return response.report;
}
