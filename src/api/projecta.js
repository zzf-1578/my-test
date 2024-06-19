import service from '../assets/js/service';

export function getUserTokenMsg() {
  return service.http({
    sid: '5545004',
    datas: {},
  });
}
