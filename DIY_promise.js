(function (window){
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  //const promise function
  function Promise(excutor){
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];

    function resolve(value){
      if(self.staus !== PENDING) return
      self.status = RESOLVED;
      self.data = value;

      if(self.callbacks.length >0){
        setTimeout(() => {
          self.callbacks.forEach(cbsObj =>{
            cbsObj.onResolved(value)
          })
        });
      }
    }
    function reject(reason){
      if(self.staus !== PENDING) return
      self.status = REJECTED;
      self.data = reason;

      if(self.callbacks.length >0){
        setTimeout(() => {
          self.callbacks.forEach(cbsObj =>{
            cbsObj.onResolved(value)
          })
        });
      }
    }
    try{
      excutor(resolve,reject)
    } catch(error){
      console.log('-----')
      reject(error)
    }
  }
  Promise.prototype.then = function(onResolved,onRejected){
    const self = this;
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected ==='function' ? onRejected : reason => {throw reason};
    return new Promise((resolve,reject)=>{
      function handle(callback){
        try {
          const result = callback(self.data)
          if(!(result instanceof Promise)){
            resolve(result)
          }else{
            result.then(
              value => resolve(value),
              reason => reject(reason)
            )
          }
        } catch (error){
          reject(error)
        }
      }
      if(self.status === RESOLVED){
        setTimeout(() => {
          handle(onResolved)
        });
      }else if(self.status ===REJECTED){
        setTimeout(() => {
          handle(onRejected)
        });
      }else {
        self.callbacks.push({
          onResolved(value){
            handle(onResolved)
          },
          onRejected(reason){
            handle(onResolved)
          }
        })
      }
    })
  }
  Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
  }
  Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
      if(value instanceof Promise){
        value.then(resolve,reject)
      }else{
        resolve(value)
      }
    })
  }
  Promise.reject = function (reason){
    return new Promise((resolve,reject)=>{
      reject(reason)
    })
  }
  Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
      let resolvedCount = 0;
      const values = new Array(promises,length)
      promises.forEach((p, index)=>{
        p.then(
          value => {
            resolvedCount++;
            values[index]= value;
            if (resolvedCount === promises.length){
              resolve(values)
            }
          },
          reason => reject(reason)
        )
      })
    })
  }
  Promise.race = function([]){
    return new Promise((resolved,reject)=>{
      promise.forEach(p=>{
        p.then(resolve,reject)
      })
    })
  }
//output promise
window.Promise = Promise
}
)(window)