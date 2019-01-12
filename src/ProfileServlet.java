import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class ProfileServlet extends HttpServlet {
    static ScoreBase scoreBase;

    @Override
    public void init(){
        scoreBase=new ScoreBase();
        System.out.println("vgvghvgj");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        String userName =((String)session.getAttribute("name"));
        String score =request.getParameter("score");
        scoreBase.changeScore(Integer.parseInt(score),userName);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        StringBuilder sb= new StringBuilder();
        HttpSession session = request.getSession(false);
        PrintWriter out = response.getWriter();
        String userName =((String)session.getAttribute("name"));
        Integer score =scoreBase.findScoreByName(userName);
        sb.append(scoreBase.getRecords()).append("\n").append("Вы занимаете ").append(scoreBase.getPlace(userName)).append("с результатом ").append(score.toString());
        out.write(sb.toString());
    }
}