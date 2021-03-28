class Topic {
    constructor(name, slug) {
      this.name = name;
      this.slug = slug;
      this.subTopics = [];
    }
  
    addTopic(topic) {
      this.subTopics.push(topic);
    }
  
    lastTopic() {
      return this.subTopics[this.subTopics.length-1];
    }
  
    toString() {
      //var header = this.name + "(" + this.slug + ")";
      var header = `${this.name} (${this.slug})`;
  
      var topicStrings = "";
      for (var i=0; i<this.subTopics.length; i++){
        topicStrings += `\n${this.subTopics[i]}`;
      }
      topicStrings = topicStrings.split('\n').map(l => "  " + l).join('\n');
      return header + topicStrings;
    }
  
  }
  
  export function parseIndexFileToTree (content) {
    // 2 spaces = 1 index
    const lines = content.split('\n');
    const ret = parseHelper(0,0, new Topic("Cloud Native Security Map", "cloud-native-security-map"), lines)[0];
  
    // Explore tree
    console.log(ret.toString());
    return ret;
  }
  
  // Recursive helper to help add sub topics to a topic header
function parseHelper (currIndex, startLine, topic, lines) {
    currIndex = currIndex;
    var i;
    var retData, endLine;
    for(i = startLine;i < lines.length; i++){
      const line = lines[i];
      const spacing = line.search(/\S/);
  
      // Ignore empty line
      if (spacing === -1) {
        continue;
      }
      const lineIndex = spacing / 2;
      if (lineIndex > currIndex+1) {
          console.log("Parse Error: Invalid index is more than 1 level down from previous line");
          throw "Parse Error: Invalid index is more than 1 level down from previous line";
      }
  
      if (lineIndex === currIndex) {
        // If still in current depth, means a new topic
        const obj = JSON.parse(line.substr(line.indexOf("{")));
        topic.addTopic(new Topic(obj.name, obj.slug));
      } else if (lineIndex === currIndex+1) {
        // next index depth means the previous topic has sub-topics, recursive call for content of the last topic
        [retData, endLine] = parseHelper(currIndex+1, i, topic.lastTopic(), lines);
        i=endLine-1;
      } else {
        // else we are in a previous depth, that means we are done adding to a topic
        [retData, endLine] = [topic,i];
        return [retData,endLine];
      }
    }
    retData = topic;
    endLine = i;
    return [retData, endLine];
  }
  
  