import request from '@/util/request'


function _interopRequireDefault(obj) {
  return obj && obj.__esModule ?
    obj :
    {
      default: obj
    }
}
const _request = _interopRequireDefault(request)
const get = _request.default.get,
  post = _request.default.post;
// 查询实验室位置-树形
// /system/place / queryLaboratoryPlace

export const postQueryLaboratoryPlace = data => {
  return post(`/api/system/place/queryLaboratoryPlace`, data)
}
//根据实验室位置查询实验室

export const postLaboratoryInfo = data => {
  return post(`/api/laboratory/laboratory/queryLaboratoryInfoDisplayByPage`, data)
}

//实验室人员-

export const postLaboratoryUser = data => {
  return post(`/api/laboratory/laboratory/queryExperimenterInfo`, data)
}
//实验室预约信息

export const postLaboratoryReserve = data => {
  return post(`/api/laboratory/reserveInfo/queryLaboratoryReserveInfoByPage`, data)
}

//实验室-公告分页

export const postLaboratoryNotice = data => {
  return post(`/api/message/notice/queryIntegratedMachineNoticeByPage`, data)
}