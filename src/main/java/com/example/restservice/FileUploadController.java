package com.example.restservice;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import com.example.restservice.storage.StorageFileNotFoundException;
import com.example.restservice.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@Slf4j
@Controller
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }


    @GetMapping("/files")
    @ResponseBody
    public ResponseEntity<Model> listUploadedFiles(Model model) throws IOException {

        List<String> someList = storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toString())
                .collect(Collectors.toList());

        String[] someArray = someList.stream().toArray(String[]::new);

        List<File> newList = new ArrayList<>();

        Random rng = new Random(29);

        for (int i = 0; i < someArray.length; i++) {
            newList.add(new File(String.valueOf(rng.nextInt()), someArray[i]));
        }

        model.addAttribute("files", newList);
        return ResponseEntity.ok().body(model);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @PostMapping(value = "/files", consumes = "multipart/form-data")
    @ResponseBody
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        storageService.store(file);
        return "Good!";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
