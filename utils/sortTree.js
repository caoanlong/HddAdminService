function minMaxBySortNumber(a, b) {
	return a.SortNumber - b.SortNumber
}
function sortAll(arr) {
	arr.sort(minMaxBySortNumber)
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children && arr[i].children.length > 0) {
			sortAll(arr[i].children)
		}
	}
}

function menusTree(source) {
	let data = source.map(item => {
		return {
			Menu_ID: String(item.Menu_ID),
			Menu_PID: String(item.Menu_PID),
			Name: item.Name,
			Target: item.Target,
			SortNumber: item.SortNumber,
			Href: item.Href,
			Icon: item.Icon,
			IsShow: item.IsShow,
			Visable: item.Visable,
			CreateBy: item.CreateBy,
			CreateDate: item.CreateDate,
			UpdateBy: item.UpdateBy,
			UpdateDate: item.UpdateDate,
			Remark: item.Remark
		}
	})
	let json = [], hash = {}
	return new Promise((resolve, reject) => {
		for (let i = 0; i < data.length; i++) {
			hash[data[i].Menu_ID] = data[i]
		}
		let hashVP
		for (let j = 0; j < data.length; j++) {
			hashVP = hash[data[j].Menu_PID]
			if (hashVP) {
				if (!hashVP.children) {
					hashVP.children = []
				}
				hashVP.children.push(data[j])
			} else {  
				json.push(data[j])
			}
		}
		sortAll(json)
		resolve(json)
	})
}

function set_contenttopicsTree(source) {
	let data = source.map(item => {
		return {
			ContentTopic_ID: item.ContentTopic_ID,
			ContentTopic_PID: item.ContentTopic_PID,
			Type: item.Type,
			Code: item.Code,
			Name: item.Name,
			isEnable: item.isEnable,
			CreateBy: item.CreateBy,
			CreateTime: item.CreateTime,
			UpdateBy: item.UpdateBy,
			UpdateTime: item.UpdateTime,
			DeleteFlag: item.DeleteFlag,
			DeleteBy: item.DeleteBy,
			DeleteTime: item.DeleteTime
		}
	})
	let json = [], hash = {}
	return new Promise((resolve, reject) => {
		for (let i = 0; i < data.length; i++) {
			hash[data[i].ContentTopic_ID] = data[i]
		}
		let hashVP
		for (let j = 0; j < data.length; j++) {
			hashVP = hash[data[j].ContentTopic_PID]
			if (hashVP) {
				if (!hashVP.children) {
					hashVP.children = []
				}
				hashVP.children.push(data[j])
			} else {  
				json.push(data[j])
			}
		}
		resolve(json)
	})
}

module.exports = {
	menusTree,
	set_contenttopicsTree
}