async function main() {
    const Obj = new Monitor();
    console.log(await Obj.getAll());
    console.log(await Obj.add(1,1,1));
  }
  
  
  class Monitor {
    monitorsRef = db.collection("monitor");
  
    async add(cpu, fmem, temp) {
        const monitor = { cpu, fmem, temp};
  
        try {
            const docRef = await this.monitorsRef.add(monitor);
            console.log('monitor Added with ID: ', docRef.id);
            monitor.id = docRef.id;
  
        } catch (error) {
            console.error('Error Adding monitor: ', error)
        }
  
        return monitor;
    }
  
    async getAll() {
        const monitors = [];
        try {
            const snapshot = await this.monitorsRef.get()
            snapshot.forEach(doc => monitors.push({id: doc.id, ...doc.data()}))
        } catch (err) {
            console.error('Error Getting monitors: ', error);
        }
  
        return monitors;
    }
  
    async get(id) {
        let monitor;
  
        try {
            let doc = await this.monitorsRef.doc(id).get();
            if(doc.exists) 
                monitor = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting monitor: ', error);
        }
  
        return monitor;
    }
  
    async delete(id) {
        try {
            await this.monitorsRef.doc(id).delete();
            console.log('monitor is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting monitor: ', error);
        }
    }
  }
  module.exports = { main }