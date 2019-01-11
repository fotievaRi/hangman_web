import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Logger;

public class DataBase {
    private String path="/home/ann/git/hangman_web/src/resource/data.txt";
    private HashMap<String, String> dataList = new HashMap<>();
    private Logger logger= Logger.getLogger(DataBase.class.getName());

    public boolean checkName(String name){
        return dataList.containsKey(name);
    }

    public boolean checkNameAndPassword(String name, String password){
        boolean findName=dataList.containsKey(name);
        if (findName){
            return dataList.get(name).contains(password);
        }
        else return findName;
    }
    public void addData(String name, String password){
        dataList.put(name, password);
        try {
            writeFile();
        }
        catch (IOException e){
            logger.info(e.getMessage());
        }
    }
    synchronized void readFile() throws FileNotFoundException {
        try (Scanner sc = new Scanner(new File(path))){
            while (sc.hasNextLine()) {
                String[] tmp = sc.nextLine().split(" ");
                if(tmp.length==2) {
                    dataList.put(tmp[0],tmp[1]);
                }
            }
        }
    }

    synchronized void writeFile() throws IOException, FileNotFoundException {
        FileWriter fstream= null;
        BufferedWriter out= null;
        try {
            fstream = new FileWriter(path);
            out = new BufferedWriter(fstream);
            for (Map.Entry<String, String> it: dataList.entrySet()) {
                out.write(it.getKey() + " ");
                out.write(it.getValue());
                out.write("\n");
            }
            out.close();
        } catch (IOException e) {
            logger.info(e.toString());
        }
        finally {
            fstream.close();
            out.close();
        }
    }
}
