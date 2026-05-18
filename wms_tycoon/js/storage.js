// ==========================================
// STORAGE.JS — Persistência (localStorage)
// Depende de: gameState e gl (engine.js) em tempo de chamada
// ==========================================

let deleteTargetIndex = -1;

function saveGameSession(companyName, warehouseType, remainingCash, auditStatus = false, maxSpace = 0) {
    let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
    const newSave = {
        name: companyName,
        type: warehouseType,
        cash: remainingCash,
        auditCompleted: auditStatus,
        maxSpace: maxSpace,
        choices: gameState.choices,
        upgrades: gl.upgrades || { forklift: false, ai_wms: false, training: false },
        date: new Date().toLocaleString('pt-BR')
    };
    saves.unshift(newSave);
    if (saves.length > 4) saves.pop();
    localStorage.setItem('wms_saves', JSON.stringify(saves));
}

// Salva o estado atual pelo index para garantir precisão absoluta
function updateCurrentSaveSession(newCash, newMaxSpace, auditStatus) {
    let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
    if (gameState.saveIndex >= 0 && gameState.saveIndex < saves.length) {
        saves[gameState.saveIndex].cash = newCash;
        saves[gameState.saveIndex].maxSpace = newMaxSpace;
        saves[gameState.saveIndex].auditCompleted = auditStatus;
        saves[gameState.saveIndex].choices  = gameState.choices;
        saves[gameState.saveIndex].upgrades = gl.upgrades || { forklift: false, ai_wms: false, training: false };
        localStorage.setItem('wms_saves', JSON.stringify(saves));
    }
}

function confirmDelete(index) { deleteTargetIndex = index; document.getElementById('modal-delete').classList.remove('hidden'); }
function closeDeleteModal() { deleteTargetIndex = -1; document.getElementById('modal-delete').classList.add('hidden'); }
function executeDelete() {
    if (deleteTargetIndex > -1) {
        let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
        saves.splice(deleteTargetIndex, 1);
        localStorage.setItem('wms_saves', JSON.stringify(saves));
        closeDeleteModal(); renderSaveSlots();
    }
}

// ==========================================
// MIGRAÇÃO DE SAVES LEGADOS
// Corrige saves antigos que não tinham auditCompleted/maxSpace gravados
// ==========================================
function migrateLegacySaves() {
    const maxSpaceByType = { 'Massa Falida': 30, 'Estagnada': 50, 'Premium': 80 };
    let saves = JSON.parse(localStorage.getItem('wms_saves')) || [];
    let needsSave = false;

    saves.forEach(function(save) {
        if (save.type && maxSpaceByType[save.type] && save.auditCompleted !== true) {
            save.auditCompleted = true;
            if (!save.maxSpace || save.maxSpace === 0) {
                save.maxSpace = maxSpaceByType[save.type];
            }
            needsSave = true;
        }
    });

    if (needsSave) {
        localStorage.setItem('wms_saves', JSON.stringify(saves));
    }
}
